// TODO: Refactor search/sort logic

import { add, isBefore, sub } from 'date-fns';
import { combine, forward, guard, sample } from 'effector';
import { KeyboardEvent } from 'react';

import { CountryBasic } from '~/api/types';
import { $isDesktop, $isMobile } from '~/core/media-query';
import { mapCountry } from '~/core/routes';
import { getInterval, isCurrentInterval } from '~/lib/date-fns-kit';
import { getInverted, getVoid, setPayload } from '~/lib/effector-kit';

import {
  $countries,
  $country,
  $countryCode,
  changeCountryCode,
} from '@/country/model';
import { $mapType, $style, changeMapType, changeStyle } from '@/map/model';

import {
  $controlsMapStyle,
  $controlsMapType,
  $controlsSortKey,
  $countriesList,
  $isContentTab,
  $isControlsChanged,
  $isControlsTab,
  $isMapTab,
  $isNextWeekAvailable,
  $isPreviousWeekAvailable,
  $isSearchFocused,
  $isSidebarCollapsed,
  $isThisWeek,
  $noSearchCountryFound,
  $noSearchResults,
  $searchActive,
  $searchText,
  $sortKey,
  $tab,
  $week,
  blurInputFx,
  changeControlsMapStyle,
  changeControlsMapType,
  changeControlsSortKey,
  changeIsSearchFocused,
  changeSearchText,
  changeSortKey,
  clearSearchText,
  nextWeek,
  onClickSidebar,
  onSearchPressEnter,
  onSearchPressKey,
  previousWeek,
  selectControlsTab,
  selectInfoTab,
  selectMapTab,
  submitControlsChanges,
  toggleSidebar,
} from './model';
import { sortCountries } from './sort-countries';

const startsWith = (haystack: string, needle: string): boolean =>
  haystack.toLocaleLowerCase().startsWith(needle.toLocaleLowerCase());

$searchText.on(changeSearchText, setPayload);
$searchText.reset(clearSearchText);
$isSidebarCollapsed.on(toggleSidebar, getInverted);
$sortKey.on(changeSortKey, setPayload);
$isSearchFocused.on(changeIsSearchFocused, setPayload);
$isSearchFocused.reset(changeCountryCode);

guard({
  source: onClickSidebar,
  filter: $isSidebarCollapsed,
  target: toggleSidebar,
});

const $sortedCountries = combine(
  [$countries, $sortKey],
  ([countries, sortKey]) => {
    if (!countries) return null;

    return [
      ...countries.sort((a: CountryBasic, b: CountryBasic) =>
        sortCountries(a, b, sortKey)
      ),
    ];
  }
);

sample({
  source: combine([$countries, $countryCode]),
  fn: ([countries, countryCode]) => {
    if (!countryCode || !countries) return '';
    return (
      countries.find(
        (country) =>
          country.code.toLocaleLowerCase() === countryCode.toLocaleLowerCase()
      )?.name ?? ''
    );
  },
  target: changeSearchText,
});

sample({
  source: combine([$sortedCountries, $searchText]),
  fn: ([sortedCountries, searchText]) =>
    sortedCountries
      // prettier-ignore
      ?.filter((country) => startsWith(country.name, searchText)) ?? [],
  target: $countriesList,
});

sample({
  source: $searchText,
  fn: Boolean,
  target: $searchActive,
});

sample({
  source: $countriesList,
  fn: (countriesList) => !countriesList.length,
  target: $noSearchResults,
});

blurInputFx.use((event: KeyboardEvent<HTMLInputElement>) =>
  event.currentTarget.blur()
);

forward({
  from: guard({
    source: onSearchPressKey,
    filter: (event) => event.key === 'Enter',
  }),
  to: [onSearchPressEnter, blurInputFx],
});

sample({
  source: guard(combine([$countriesList, $searchText]), {
    filter: ([countryList, searchText]) =>
      countryList?.length === 1 &&
      countryList[0].integration_status > 0 &&
      countryList[0].name.toLowerCase() === searchText.toLowerCase(),
  }),
  clock: onSearchPressEnter,
  fn: ([countryList]) =>
    countryList?.length ? { code: countryList[0].code } : undefined,
  target: mapCountry.navigate,
});

sample({
  source: combine([$countriesList, $searchText]),
  clock: onSearchPressEnter,
  fn: ([countryList, searchText]) =>
    countryList?.length !== 1 ||
    countryList[0].name.toLowerCase() !== searchText.toLowerCase(),
  target: $noSearchCountryFound,
});

sample({
  source: $searchText,
  fn: () => false,
  target: $noSearchCountryFound,
});

sample({
  source: $week,
  fn: (week) => isCurrentInterval(week, 'week'),
  target: $isThisWeek,
});

sample({
  source: $isThisWeek,
  fn: getInverted,
  target: $isNextWeekAvailable,
});

sample({
  source: combine([$week, $country]),
  fn: ([week, country]) => {
    if (!country) {
      return false;
    }
    return isBefore(new Date(country.date_schools_mapped), week.start);
  },
  target: $isPreviousWeekAvailable,
});

$week.on(nextWeek, (week) =>
  getInterval(add(week.start, { weeks: 1 }), 'week')
);
$week.on(previousWeek, (week) =>
  getInterval(sub(week.start, { weeks: 1 }), 'week')
);
$week.reset(changeCountryCode);

// Controls

$controlsMapType.on(changeControlsMapType, setPayload);
$controlsMapStyle.on(changeControlsMapStyle, setPayload);
$controlsSortKey.on(changeControlsSortKey, setPayload);

forward({
  from: $mapType,
  to: $controlsMapType,
});

forward({
  from: $style,
  to: $controlsMapStyle,
});

forward({
  from: $sortKey,
  to: $controlsSortKey,
});

const $controlsContext = combine({
  currentMapType: $mapType,
  mapType: $controlsMapType,
  currentStyle: $style,
  style: $controlsMapStyle,
  currentSortKey: $sortKey,
  sortKey: $controlsSortKey,
});

sample({
  source: $controlsContext,
  fn: ({
    currentMapType,
    mapType,
    currentStyle,
    style,
    currentSortKey,
    sortKey,
  }) =>
    currentMapType !== mapType ||
    currentStyle !== style ||
    currentSortKey !== sortKey,
  target: $isControlsChanged,
});

const isNotEqual = ([a, b]: [string, string]) => a !== b;

sample({
  source: guard(combine([$controlsMapType, $mapType]), { filter: isNotEqual }),
  clock: submitControlsChanges,
  fn: ([controlsMapType]) => controlsMapType,
  target: changeMapType,
});

sample({
  source: guard(combine([$controlsMapStyle, $style]), { filter: isNotEqual }),
  clock: submitControlsChanges,
  fn: ([controlsMapStyle]) => controlsMapStyle,
  target: changeStyle,
});

sample({
  source: guard(combine([$controlsSortKey, $sortKey]), {
    filter: isNotEqual,
  }),
  clock: submitControlsChanges,
  fn: ([controlsSortKey]) => controlsSortKey,
  target: changeSortKey,
});

// Tabs
$tab.on(selectMapTab, () => 'map');
$tab.on(selectInfoTab, () => 'content');
$tab.on(selectControlsTab, () => 'controls');

sample({
  source: combine([$isMobile, $tab]),
  fn: ([isMobile, tab]) => (isMobile ? tab === 'map' : false),
  target: $isMapTab,
});

sample({
  source: combine([$isDesktop, $tab]),
  fn: ([isDesktop, tab]) => isDesktop || tab === 'content',
  target: $isContentTab,
});

sample({
  source: combine([$isMobile, $tab]),
  fn: ([isMobile, tab]) => isMobile && tab === 'controls',
  target: $isControlsTab,
});

// Navigate to list on search
sample({
  source: changeSearchText,
  fn: getVoid,
  target: selectInfoTab,
});
