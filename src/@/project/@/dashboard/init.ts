import { combine, guard, sample } from 'effector';

import { fetchCountriesFx, fetchGlobalStatsFx } from '~/api/project-connect';
import { CountryBasic } from '~/api/types';
import { router } from '~/core/routes';
import { getInverted, setBoolean, setPayload } from '~/lib/effector-kit';

import { $countries } from '@/map/@/country';
import { sortCountries } from '@/map/@/sidebar/sort-countries';
import { scrollToHashFx } from '@/scroll/scroll-to-hash-fx';

import {
  $countriesList,
  $hasSearchText,
  $isListType,
  $isLoading,
  $noSearchResults,
  $searchText,
  $sortKey,
  changeSearchText,
  changeSortKey,
  changeViewType,
  clearSearchText,
} from './model';

const hasText = (haystack: string, needle: string): boolean =>
  haystack.toLocaleLowerCase().startsWith(needle.toLocaleLowerCase());

// Init
$searchText.on(changeSearchText, setPayload);
$isListType.on(changeViewType, getInverted);
$searchText.reset(clearSearchText);
$hasSearchText.on($searchText, setBoolean);
$sortKey.on(changeSortKey, setPayload);

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
      ?.filter((country) => hasText(country.name, searchText))
      ?.slice(0, 8) ?? [],
  target: $countriesList,
});

sample({
  source: $countriesList,
  fn: (countriesFound) => !countriesFound.length,
  target: $noSearchResults,
});

// Update pending status
sample({
  source: combine([fetchCountriesFx.pending, fetchGlobalStatsFx.pending]),
  fn: (states) => states.some(Boolean),
  target: $isLoading,
});

// Scroll to hash
sample({
  source: router.hash,
  clock: guard({
    source: $isLoading,
    filter: getInverted,
  }),
  target: scrollToHashFx,
});
