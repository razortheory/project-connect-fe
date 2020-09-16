import { combine, sample } from 'effector';

import { fetchGlobalStatsDataFx } from '~/features/map';
import { $countriesData, fetchCountriesDataFx } from '~/features/map/country';
import { getInverted, setPayload } from '~/lib/effector-kit';

import {
  $isListType,
  $isLoading,
  $noSearchResults,
  $searchResults,
  $searchText,
  changeSearchText,
  changeViewType,
  clearSearchText,
} from './model';

// Init
$searchText.on(changeSearchText, setPayload);
$isListType.on(changeViewType, getInverted);
$searchText.reset(clearSearchText);

sample({
  source: combine({
    countriesData: $countriesData,
    searchText: $searchText,
  }),
  // TODO: sort
  fn: ({ countriesData, searchText }) =>
    countriesData
      ?.filter((countryData) =>
        countryData.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
      )
      ?.slice(0, 8) ?? null,
  target: $searchResults,
});

sample({
  source: $searchResults,
  fn: (countriesFound) => !countriesFound?.length,
  target: $noSearchResults,
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
