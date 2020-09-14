import { useStore } from 'effector-react';
import React from 'react';

import IconList from '~/assets/images/list.svg';
import IconSearch from '~/assets/images/search.svg';
import IconTile from '~/assets/images/tile.svg';
import { getInverted, getVoid } from '~/lib/effector-kit';

import {
  $isListType,
  $searchText,
  changeSearchText,
  changeViewType,
  clearSearchText,
  getTargetValue,
} from './model';

// View
const onChange = changeSearchText.prepend(getTargetValue);
const onChangeView = changeViewType.prepend(getInverted);
const onClear = clearSearchText.prepend(getVoid);

export const SearchSortBox = () => (
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
