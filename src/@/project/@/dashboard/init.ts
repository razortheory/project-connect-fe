import { combine, sample } from 'effector';

import {
  fetchCountriesDataFx,
  fetchGlobalStatsDataFx,
} from '~/api/project-connect';
import { CountryMetaData } from '~/api/types';
import { getInverted, setBoolean, setPayload } from '~/lib/effector-kit';

import { $countriesData } from '@/map/@/country';
import { countriesSortData } from '@/map/@/sidebar/constants';
import { sortCallbacks } from '@/map/@/sidebar/helpers';

import {
  $countries,
  $hasSearchText,
  $isListType,
  $isLoading,
  $notFound,
  $searchText,
  $sortValue,
  changeSearchText,
  changeSortValue,
  changeViewType,
  clearSearchText,
} from './model';

const hasText = (haystack: string, needle: string): boolean =>
  haystack.toLocaleLowerCase().includes(needle.toLocaleLowerCase());

// Init
$searchText.on(changeSearchText, setPayload);
$isListType.on(changeViewType, getInverted);
$searchText.reset(clearSearchText);
$hasSearchText.on($searchText, setBoolean);
$sortValue.on(changeSortValue, setPayload);

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
  source: combine({
    countriesData: $sortedList,
    searchText: $searchText,
  }),
  fn: ({ countriesData, searchText }) =>
    countriesData
      ?.filter((countryData) => hasText(countryData.name, searchText))
      ?.slice(0, 8) ?? [],
  target: $countries,
});

sample({
  source: $countries,
  fn: (countriesFound) => !countriesFound.length,
  target: $notFound,
});

// Update pending status
sample({
  source: combine([
    fetchCountriesDataFx.pending,
    fetchGlobalStatsDataFx.pending,
  ]),
  fn: (states) => states.some(Boolean),
  target: $isLoading,
});
