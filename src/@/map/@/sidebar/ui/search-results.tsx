import { useStore } from 'effector-react';
import React from 'react';

import { CountryBasic } from '~/api/types';
import { mapCountries } from '~/core/routes';
import { Link } from '~/lib/router';

import { $countriesList, $noSearchResults } from '@/map/@/sidebar/model';

import { CountryListItem } from './country-list-item';

export const SearchResults = () => {
  const countiesList = useStore($countriesList);

  return (
    <div className="sidebar__content sidebar__search-results">
      {useStore($noSearchResults) ? (
        <div className="not-found">
          <span>Not found</span>
          <Link to={mapCountries} className="not-found-link">
            View country list
          </Link>
        </div>
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
