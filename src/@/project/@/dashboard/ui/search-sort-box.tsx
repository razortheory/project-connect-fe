import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import IconList from '~/assets/images/list.svg';
import IconSearch from '~/assets/images/search.svg';
import IconTile from '~/assets/images/tile.svg';
import { getInverted, getVoid } from '~/lib/effector-kit';
import { getInputValue } from '~/lib/event-reducers';
import { selectValue } from '~/lib/event-reducers/select-value';

import { SortKey } from '@/map/@/sidebar/types';
import {
  $hasSearchText,
  $isListType,
  $searchText,
  $sortKey,
  changeSearchText,
  changeSortKey,
  changeViewType,
  clearSearchText,
} from '@/project/@/dashboard/model';

// View
const onChange = changeSearchText.prepend(getInputValue);
const onChangeView = changeViewType.prepend(getInverted);
const onClear = clearSearchText.prepend(getVoid);
const onSortChange = changeSortKey.prepend(selectValue<SortKey>());

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

    <div className="controls-bar__sort">
      <span>Sort by:</span>{' '}
      <select
        onChange={onSortChange}
        value={useStore($sortKey)}
        className="select-dashboard"
      >
        <option value="amountOfDataAvailable">Amount of data available</option>
        <option value="dateOfJoining">Date of joining</option>
        <option value="countryProgress">Country progress</option>
        <option value="percentSchoolWithConnectivity">
          % Schools with connectivity
        </option>
      </select>
    </div>

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
