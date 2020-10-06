// TODO: Refactor search/sort logic

import { add, sub } from 'date-fns';
import { combine, forward, guard, sample } from 'effector';
import { KeyboardEvent } from 'react';

import { CountryBasic } from '~/api/types';
import { mapCountry } from '~/core/routes';
import { getInterval, isCurrentInterval } from '~/lib/date-fns-kit';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { $countries } from '@/map/@/country';
import { $countryId, changeCountryId } from '@/map/@/country/model';
import { $mapType, $style, changeMapType, changeStyle } from '@/map/model';

import {
  $controlsMapStyle,
  $controlsMapType,
  $controlsSortKey,
  $countriesList,
  $isControlsChanged,
  $isSidebarCollapsed,
  $isThisWeek,
  $noSearchCountryFound,
  $noSearchResults,
  $searchActive,
  $searchText,
  $sortKey,
  $week,
  blurInputFx,
  changeControlsMapStyle,
  changeControlsMapType,
  changeControlsSortKey,
  changeSearchText,
  changeSortKey,
  clearSearchText,
  nextWeek,
  onClickSidebar,
  onSearchPressEnter,
  onSearchPressKey,
  previousWeek,
  submitControlsChanges,
  toggleSidebar,
} from './model';
import { sortCountries } from './sort-countries';

const hasText = (haystack: string, needle: string): boolean =>
  haystack.toLocaleLowerCase().includes(needle.toLocaleLowerCase());

$searchText.on(changeSearchText, setPayload);
$searchText.reset(clearSearchText);
$isSidebarCollapsed.on(toggleSidebar, getInverted);
$sortKey.on(changeSortKey, setPayload);

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
  source: combine([$sortedCountries, $searchText]),
  fn: ([sortedCountries, searchText]) =>
    sortedCountries
      // prettier-ignore
      ?.filter((country) => hasText(country.name, searchText)) ?? [],
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
  source: $countryId,
  target: clearSearchText,
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

$week.on(nextWeek, (week) =>
  getInterval(add(week.start, { weeks: 1 }), 'week')
);
$week.on(previousWeek, (week) =>
  getInterval(sub(week.start, { weeks: 1 }), 'week')
);
$week.reset(changeCountryId);

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
