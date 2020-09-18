import { sample } from 'effector';

import { getInverted, setPayload } from '~/lib/effector-kit';

import { $countriesData } from '@/map/@/country';
import { CountryData } from '@/map/types';

import {
  $isSidebarHidden,
  $noSearchResults,
  $searchResults,
  $searchText,
  $showSearchResults,
  changeSearchText,
  clearSearchText,
  toggleSidebarVisibility,
} from './model';

$searchText.on(changeSearchText, setPayload);
$searchText.reset(clearSearchText);
$isSidebarHidden.on(toggleSidebarVisibility, getInverted);

sample({
  source: $countriesData,
  clock: $searchText,
  fn: (countriesData: CountryData[] | null, searchText: string) =>
    countriesData?.filter((countryData) =>
      countryData.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    ) ?? null,
  target: $searchResults,
});

sample({
  source: $searchText,
  fn: Boolean,
  target: $showSearchResults,
});

sample({
  source: $searchResults,
  fn: (countriesFound) => !countriesFound?.length,
  target: $noSearchResults,
});
