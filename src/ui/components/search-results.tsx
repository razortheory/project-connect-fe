import { useStore } from 'effector-react';
import React from 'react';

import { mapCountry } from '~/core/routes';
import { CountryData } from '~/features/map/types';
import { Link } from '~/lib/router';

import { $noSearchResults, $searchResults } from './search';

export const NotFound = () => <div>Not found</div>;

export const CountryList = () => (
  <ul className="list">
    {useStore($searchResults)?.map((country: CountryData) => (
      <li key={country.id} className="list__item list__item--not-verified">
        <Link to={mapCountry} params={{ id: country.id }}>
          {country.name}
        </Link>
      </li>
    ))}
  </ul>
);

export const SearchResults = () => (
  <>{useStore($noSearchResults) ? <NotFound /> : <CountryList />}</>
);
