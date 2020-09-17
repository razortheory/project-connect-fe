import { combine, sample } from 'effector';

import { fetchGlobalStatsDataFx } from '~/features/map';
import { $countriesData, fetchCountriesDataFx } from '~/features/map/country';
import { getInverted, setBoolean, setPayload } from '~/lib/effector-kit';

import {
  $countries,
  $hasSearchText,
  $isListType,
  $isLoading,
  $notFound,
  $searchText,
  changeSearchText,
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

sample({
  source: combine({
    countriesData: $countriesData,
    searchText: $searchText,
  }),
  // TODO: sort
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
