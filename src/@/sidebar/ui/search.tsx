import { useStore } from 'effector-react';
import React from 'react';

import IconSearch from '~/assets/images/icon-search.svg';
import { mapCountries, mapCountry } from '~/core/routes';
import { getVoid } from '~/lib/effector-kit';
import { getInputValue } from '~/lib/event-reducers';

import {
  $searchActive,
  $searchText,
  changeIsSearchFocused,
  changeSearchText,
  clearSearchText,
  onSearchPressKey,
  selectMapTab,
} from '@/sidebar/model';

const onChange = changeSearchText.prepend(getInputValue);
const onClear = clearSearchText.prepend(getVoid);

type SearchPropsType = {
  searchBarClassName?: string;
  searchBarInputClassName?: string;
};

export const Search = ({
  searchBarClassName,
  searchBarInputClassName,
}: SearchPropsType) => {
  const isMapCountry = useStore(mapCountry.visible);
  return (
    <div
      className={
        searchBarClassName
          ? ['sidebar__search-bar', 'search-bar', searchBarClassName].join(' ')
          : 'sidebar__search-bar search-bar'
      }
    >
      <div className="search-bar__icon">
        <IconSearch />
      </div>
      <input
        className={
          searchBarInputClassName
            ? ['search-bar__input', searchBarInputClassName].join(' ')
            : 'search-bar__input'
        }
        type="text"
        placeholder="Search for a country"
        onKeyPress={onSearchPressKey}
        onChange={onChange}
        onFocus={() => changeIsSearchFocused(true)}
        onBlur={() => changeIsSearchFocused(false)}
        value={useStore($searchText)}
      />
      {useStore($searchActive) && (
        <button
          className="search-bar__close"
          type="button"
          onClick={
            isMapCountry
              ? () => {
                  mapCountries.navigate();
                  selectMapTab();
                }
              : onClear
          }
        >
          <span className="visually-hidden">Clear search</span>
        </button>
      )}
    </div>
  );
};
