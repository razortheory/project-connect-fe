import { useStore } from 'effector-react';
import React from 'react';

import { mapCountry } from '~/core/routes';
import { Link } from '~/lib/router';

import { $noSearchResults, $searchResults } from '@/map/@/sidebar/model';
import { CountryData } from '@/map/types';

export const NotFound = () => (
  <div className="sidebar__not-found not-found">
    <div className="not-found__icon">{/* Icon to be added here */}</div>
    <h3 className="not-found__title">Country not found</h3>
    <p className="not-found__description">
      Try browsing through our&#160;
      <a className="not-found__link" href="/">
        country list
      </a>
    </p>
  </div>
);

export const CountriesFound = () => (
  <ul className="list">
    {useStore($searchResults)?.map((country: CountryData) => (
      <li key={country.id} className="list__item list__item--not-verified">
        <Link to={mapCountry} params={{ code: country.code.toLowerCase() }}>
          {country.name}
        </Link>
      </li>
    ))}
  </ul>
);

export const SearchResults = () => (
  <>{useStore($noSearchResults) ? <NotFound /> : <CountriesFound />}</>
);
