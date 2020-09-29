import { useStore } from 'effector-react';
import React from 'react';

import { CountryBasic } from '~/api/types';

import { $countriesList, $noSearchResults } from '@/map/@/sidebar/model';

import { CountryListItem } from './country-list-item';

export const SearchResults = () => {
  const countiesList = useStore($countriesList);

  return (
    <div className="sidebar__content sidebar__search-results">
      {useStore($noSearchResults) ? (
        // TODO: Style according to design
        <span style={{ padding: 30 }}>Not found</span>
      ) : (
        <ul className="sidebar__country-list list">
          {countiesList.map((country: CountryBasic) => (
            <CountryListItem country={country} key={country.id} />
          ))}
        </ul>
      )}
    </div>
  );
};
