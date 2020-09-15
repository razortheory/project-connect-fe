import { createEvent, createStore, sample } from 'effector';
import { useStore } from 'effector-react';
import React, { ChangeEvent } from 'react';

import { $countriesData } from '~/features/map/country';
import { CountryData } from '~/features/map/types';
import { getVoid, setPayload } from '~/lib/effector-kit';

// Helpers
export const getTargetValue = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.value;

// Model
const changeSearchText = createEvent<string>();
const clearSearchText = createEvent();

const $searchText = createStore('');
export const $searchResults = createStore<CountryData[] | null>([]);
export const $showSearchResults = createStore(false);
export const $noSearchResults = createStore(false);

// Init
$searchText.on(changeSearchText, setPayload);
$searchText.reset(clearSearchText);

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

// View
const onChange = changeSearchText.prepend(getTargetValue);
const onClear = clearSearchText.prepend(getVoid);

export const Search = () => (
  <div className="sidebar__search-bar search-bar">
    <div className="search-bar__icon" />
    <input
      className="search-bar__input"
      type="text"
      placeholder="Search for a country"
      onChange={onChange}
      value={useStore($searchText)}
    />
    <button className="search-bar__close" type="button" onClick={onClear}>
      +
    </button>
  </div>
);
