import { useStore } from 'effector-react';
import React from 'react';

import IconSearch from '~/assets/images/icon-search.svg';
import { getVoid } from '~/lib/effector-kit';

import { getInputValue } from '@/map/@/sidebar/helpers';
import {
  $searchText,
  changeSearchText,
  clearSearchText,
} from '@/map/@/sidebar/model';

const onChange = changeSearchText.prepend(getInputValue);
const onClear = clearSearchText.prepend(getVoid);

export const Search = () => (
  <div className="sidebar__search-bar search-bar">
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
    <button className="search-bar__close" type="button" onClick={onClear}>
      <span className="visually-hidden">Clear search</span>
    </button>
  </div>
);
