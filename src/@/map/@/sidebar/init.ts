import { add, sub } from 'date-fns';
import { combine, forward, guard, sample } from 'effector';
import { KeyboardEvent } from 'react';

import { CountryMetaData } from '~/api/types';
import { mapCountry } from '~/core/routes';
import { getWeekInterval, isThisWeekInterval } from '~/lib/date-fns-kit';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { $countriesData } from '@/map/@/country';
import { changeCountryId } from '@/map/@/country/model';
import { $mapType, $style, changeMapType, changeStyle } from '@/map/model';

import { countriesSortData } from './constants';
import { sortCallbacks } from './helpers';
import {
  $controlsMapStyle,
  $controlsMapType,
  $controlsSortValue,
  $countryList,
  $isControlsChanged,
  $isSidebarHidden,
  $isThisWeek,
  $noSearchCountryFound,
  $noSearchResults,
  $searchActive,
  $searchText,
  $sortValue,
  $week,
  blurInputFx,
  changeControlsMapStyle,
  changeControlsMapType,
  changeControlsSortValue,
  changeSearchText,
  changeSortValue,
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

$searchText.on(changeSearchText, setPayload);
$searchText.reset(clearSearchText);
$isSidebarHidden.on(toggleSidebarVisibility, getInverted);
$sortValue.on(changeSortValue, setPayload);

guard({
  source: onClickSidebar,
  filter: $isSidebarHidden,
  target: toggleSidebarVisibility,
});

const $sortedList = combine(
  [$countriesData, $sortValue],
  ([countriesData, sortKey]) => {
    const { field, sortType } = countriesSortData[sortKey];
    if (!countriesData) {
      return null;
    }
    return [
      ...countriesData.sort((a: CountryMetaData, b: CountryMetaData) =>
        sortCallbacks(a, b, field, sortType)
      ),
    ];
  }
);

sample({
  source: combine([$sortedList, $searchText]),
  fn: ([countryList, searchText]) =>
    countryList?.filter((countryData) =>
      countryData.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    ) ?? null,
  target: $countryList,
});

sample({
  source: $searchText,
  fn: Boolean,
  target: $searchActive,
});

sample({
  source: $countryList,
  fn: (countriesFound) => !countriesFound?.length,
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

const $searchScope = combine([$countryList, $searchText]);

navigateToMapCountryFx.use((code) => {
  if (code) {
    mapCountry.navigate({ code: code.toLowerCase() });
  }
});

sample({
  source: guard($searchScope, {
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
  source: $searchScope,
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
$controlsSortValue.on(changeControlsSortValue, setPayload);

forward({
  from: $mapType,
  to: $controlsMapType,
});

forward({
  from: $style,
  to: $controlsMapStyle,
});

forward({
  from: $sortValue,
  to: $controlsSortValue,
});

const $controlsContext = combine({
  currentMapType: $mapType,
  mapType: $controlsMapType,
  currentStyle: $style,
  style: $controlsMapStyle,
  currentSortValue: $sortValue,
  sortValue: $controlsSortValue,
});

sample({
  source: $controlsContext,
  fn: ({
    currentMapType,
    mapType,
    currentStyle,
    style,
    currentSortValue,
    sortValue,
  }) =>
    currentMapType !== mapType ||
    currentStyle !== style ||
    currentSortValue !== sortValue,
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
  source: guard(combine([$controlsSortValue, $sortValue]), {
    filter: isNotEqual,
  }),
  clock: submitControlsChanges,
  fn: ([controlsSortValue]) => controlsSortValue,
  target: changeSortValue,
});
