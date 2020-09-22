import { combine, forward, guard, sample } from 'effector';
import { KeyboardEvent } from 'react';

import { CountryMetaData } from '~/api/types';
import { mapCountry } from '~/core/routes';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { $countriesData } from '@/map/@/country';
import { changeCountryId } from '@/map/@/country/model';

import { countriesSortData } from './constants';
import { sortCallbacks } from './helpers';
import {
  $countryList,
  $isSidebarHidden,
  $noSearchCountryFound,
  $noSearchResults,
  $searchActive,
  $searchText,
  $sortValue,
  blurInputFx,
  changeSearchText,
  changeSortValue,
  clearSearchText,
  goToCountryRoutingFx,
  onClickSidebar,
  onSearchPressEnter,
  onSearchPressKey,
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

goToCountryRoutingFx.use((code) => {
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
  target: goToCountryRoutingFx,
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
  source: changeSearchText,
  fn: () => false,
  target: $noSearchCountryFound,
});
