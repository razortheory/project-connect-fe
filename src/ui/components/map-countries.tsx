import { useStore } from 'effector-react';
import React from 'react';

import MapWithHand from '~/assets/images/map-with-hand.svg';
import { mapCountries, mapCountry } from '~/core/routes';
import { tabControls, tabInfo, tabMap } from '~/core/tab-routes';
import { $countriesData } from '~/features/map/model';
import { CountryData } from '~/features/map/types';
import { Link, useRoute } from '~/lib/router';

import { $showSearchResults, Search } from './search';
import { SearchResults } from './search-results';

const CountriesList = () => {
  const countries = useStore($countriesData);
  if (!countries) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="map-hint">
        <MapWithHand className="map-hint__image" alt="Unicef logo" />
        <p className="map-hint__text">
          Click on the country of interest to view the connectivity and location
          of schools.
        </p>
      </div>
      <ul className="list">
        {/* list__item--connected, list__item--verified list__item--not-verified */}
        {/* // TODO: replace country.name with the country.code when it appears in all countries */}
        {countries.map((country: CountryData) => (
          <li key={country.id} className="list__item list__item--connected">
            <Link to={mapCountry} params={{ id: country.id }}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Tabs = () => (
  <ul className="sidebar__tabs tabs">
    <Link to={mapCountries} params={{ tab: tabMap.compile() }}>
      <li className="tabs__item">
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabMap) ? 'tabs__button--active' : ''
          }`}
        >
          Map
        </button>
      </li>
    </Link>
    <Link to={mapCountries} params={{ tab: tabInfo.compile() }}>
      <li className="tabs__item">
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabInfo) ? 'tabs__button--active' : ''
          }`}
        >
          Info
        </button>
      </li>
    </Link>
    <Link to={mapCountries} params={{ tab: tabControls.compile() }}>
      <li className="tabs__item">
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabControls) ? 'tabs__button--active' : ''
          }`}
        >
          Controls
        </button>
      </li>
    </Link>
  </ul>
);

export const Content = () => (
  <>
    {useRoute(tabMap) && <p>Map</p>}
    {useRoute(tabInfo) && <CountriesList />}
    {useRoute(tabControls) && <p>Controls</p>}
  </>
);

export const MapCountries = () => (
  <>
    <Search />
    {!useStore($showSearchResults) && <Tabs />}
    <div className="sidebar__content">
      {useStore($showSearchResults) ? <SearchResults /> : <Content />}
    </div>
  </>
);
