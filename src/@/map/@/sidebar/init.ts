import { combine, guard, sample } from 'effector';

import { getInverted, setPayload } from '~/lib/effector-kit';

import { $countriesData } from '@/map/@/country';
import { CountryData } from '@/map/@/country/types';

import { countriesSortData } from './constants';
import { sortCallbacks } from './helpers';
import {
  $countryList,
  $isSidebarHidden,
  $noSearchResults,
  $searchActive,
  $searchText,
  $sortValue,
  changeSearchText,
  changeSortValue,
  clearSearchText,
  onClickSidebar,
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
      ...countriesData.sort((a: CountryData, b: CountryData) =>
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
