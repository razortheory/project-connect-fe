import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import IconList from '~/assets/images/list.svg';
import IconSearch from '~/assets/images/search.svg';
import IconTile from '~/assets/images/tile.svg';
import { getInverted, getVoid } from '~/lib/effector-kit';
import { getInputValue } from '~/lib/event-reducers';
import { Dropdown } from '~/ui';

import {
  $hasSearchText,
  $isListType,
  $searchText,
  $sortKey,
  changeSearchText,
  changeSortKey,
  changeViewType,
  clearSearchText,
} from '@/dashboard/model';
import { dropdownCountriesSortData } from '@/sidebar/constants';
import { SortKey } from '@/sidebar/types';

// View
const onChange = changeSearchText.prepend(getInputValue);
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
      {useStore($hasSearchText) && (
        <button type="button" className="search-bar__close" onClick={onClear}>
          <span className="visually-hidden">Clear search</span>
        </button>
      )}
    </div>

    <Dropdown<SortKey>
      wrapperClassName="controls-bar__sort"
      selectClassName="select-dashboard"
      items={dropdownCountriesSortData}
      value={useStore($sortKey)}
      onChange={changeSortKey}
      prefix="SORT BY:"
    />

    <div className="controls-bar__view-changer">
      <button
        type="button"
        onClick={onChangeView}
        className={clsx('view-changer__button', {
          'view-changer__button--active': useStore($isListType),
        })}
      >
        <IconList className="view-changer__icon" />
        List
      </button>

      <button
        type="button"
        onClick={onChangeView}
        className={clsx('view-changer__button', {
          'view-changer__button--active': !useStore($isListType),
        })}
      >
        <IconTile className="view-changer__icon" />
        Tile
      </button>
    </div>
  </div>
);
