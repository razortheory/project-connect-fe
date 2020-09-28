import { add, sub } from 'date-fns';
import { combine, forward, guard, sample } from 'effector';
import { KeyboardEvent } from 'react';

import { CountryBasic } from '~/api/types';
import { mapCountry } from '~/core/routes';
import { getWeekInterval, isThisWeekInterval } from '~/lib/date-fns-kit';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { $countries } from '@/map/@/country';
import { changeCountryId } from '@/map/@/country/model';
import { $mapType, $style, changeMapType, changeStyle } from '@/map/model';

import {
  $controlsMapStyle,
  $controlsMapType,
  $controlsSortKey,
  $countriesList,
  $isControlsChanged,
  $isSidebarHidden,
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
  navigateToMapCountryFx,
  nextWeek,
  onClickSidebar,
  onSearchPressEnter,
  onSearchPressKey,
  previousWeek,
  submitControlsChanges,
  toggleSidebarVisibility,
} from './model';
import { sortCountries } from './sort-countries';

const hasText = (haystack: string, needle: string): boolean =>
  haystack.toLocaleLowerCase().includes(needle.toLocaleLowerCase());

$searchText.on(changeSearchText, setPayload);
$searchText.reset(clearSearchText);
$isSidebarHidden.on(toggleSidebarVisibility, getInverted);
$sortKey.on(changeSortKey, setPayload);

guard({
  source: onClickSidebar,
  filter: $isSidebarHidden,
  target: toggleSidebarVisibility,
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

navigateToMapCountryFx.use((code) => {
  if (code) {
    mapCountry.navigate({ code: code.toLowerCase() });
  }
});

sample({
  source: guard(combine([$countriesList, $searchText]), {
    filter: ([countryList, searchText]) =>
      countryList?.length === 1 &&
      countryList[0].integration_status > 0 &&
      countryList[0].name.toLowerCase() === searchText.toLowerCase(),
  }),
  clock: onSearchPressEnter,
  fn: ([countryList]) => (countryList?.length ? countryList[0].code : null),
  target: navigateToMapCountryFx,
});

sample({
  source: changeCountryId,
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
  fn: isThisWeekInterval,
  target: $isThisWeek,
});

$week.on(nextWeek, (week) => getWeekInterval(add(week.start, { weeks: 1 })));
$week.on(previousWeek, (week) =>
  getWeekInterval(sub(week.start, { weeks: 1 }))
);

// controls
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
  fn: ([controlsSortkey]) => controlsSortkey,
  target: changeSortKey,
});
