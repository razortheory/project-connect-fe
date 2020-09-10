import { createEvent, createStore, sample } from 'effector';
import { useStore } from 'effector-react';
import React, { ChangeEvent } from 'react';

import IconList from '~/assets/images/list.svg';
import IconSearch from '~/assets/images/search.svg';
import IconTile from '~/assets/images/tile.svg';
import { $countriesData } from '~/features/map/model';
import { CountryData } from '~/features/map/types';
import { getInverted, getVoid, setPayload } from '~/lib/effector-kit';

// Helpers
export const getTargetValue = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.value;

// Model
const changeSearchText = createEvent<string>();
const changeViewType = createEvent();
const clearSearchText = createEvent();

const $searchText = createStore('');
export const $searchResults = createStore<CountryData[] | null>([]);
export const $noSearchResults = createStore(false);
export const $isListType = createStore(false);

// Init
$searchText.on(changeSearchText, setPayload);
$isListType.on(changeViewType, (state) => !state);
$searchText.reset(clearSearchText);

sample({
  source: $countriesData,
  clock: $searchText,
  // TODO: sort 8 elements
  fn: (countriesData: CountryData[] | null, searchText: string) =>
    countriesData
      ?.slice(0, 8)
      .filter((countryData) =>
        countryData.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
      ) ?? null,
  target: $searchResults,
});

sample({
  source: $searchResults,
  fn: (countriesFound) => !countriesFound?.length,
  target: $noSearchResults,
});

// View
const onChange = changeSearchText.prepend(getTargetValue);
const onChangeView = changeViewType.prepend(getInverted);
const onClear = clearSearchText.prepend(getVoid);

export const SearchSortBlock = () => (
  <div className="progress-dashboard__controls-bar controls-bar">
    <div className="controls-bar__search search-bar">
      <div className="search-bar__icon">
        <IconSearch />
      </div>

      <input
        className="search-bar__input"
        type="text"
        placeholder="Search for a country"
        onChange={onChange}
        value={useStore($searchText)}
      />

      <button type="button" className="search-bar__close" onClick={onClear}>
        +
      </button>
    </div>

    <div className="controls-bar__sort">Sort by: Country progress</div>

    <div className="controls-bar__view-changer">
      <button
        type="button"
        onClick={onChangeView}
        className={`view-changer__button ${
          useStore($isListType) ? 'view-changer__button--active' : ''
        }`}
      >
        <IconList className="view-changer__icon" />
        List
      </button>

      <button
        type="button"
        onClick={onChangeView}
        className={`view-changer__button ${
          useStore($isListType) ? '' : 'view-changer__button--active'
        }`}
      >
        <IconTile className="view-changer__icon" />
        Tile
      </button>
    </div>
  </div>
);
