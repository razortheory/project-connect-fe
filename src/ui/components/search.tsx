import { createEvent, createStore, sample } from 'effector';
import { useStore } from 'effector-react';
import React, { ChangeEvent } from 'react';

import { setPayload } from '~/lib/effector-kit';

// Helpers
export const getTargetValue = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.value;

// Model
const changeSearchText = createEvent<string>();

const $searchText = createStore('');
export const $showSearchResults = createStore(false);
export const $noSearchResults = createStore(false);

// Init
$searchText.on(changeSearchText, setPayload);

sample({
  source: $searchText,
  fn: Boolean,
  target: $showSearchResults,
});

sample({
  source: $searchText,
  fn: (searchText) => searchText.includes('x'),
  target: $noSearchResults,
});

// View
const onChange = changeSearchText.prepend(getTargetValue);

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
    <button className="search-bar__close" type="button">
      +
    </button>
  </div>
);
