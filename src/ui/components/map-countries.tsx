import React from 'react';

import MapWithHand from '~/assets/images/map-with-hand.svg';
import { mapCountry } from '~/core/routes';
import { tabControls, tabInfo, tabMap } from '~/core/tab-routes';
import { Link, useRoute } from '~/lib/router';

import { Search } from './search';

const CountriesList = () => (
  <>
    <div className="map-hint">
      <MapWithHand className="map-hint__image" alt="Unicef logo" />
      <p className="map-hint__text">
        Click on the country of interest to view the connectivity and location
        of schools.
      </p>
    </div>
    <ul className="list">
      <li className="list__item list__item--connected">
        <Link to={mapCountry} params={{ id: 'bz' }}>
          Brazil
        </Link>
      </li>
      <li className="list__item list__item--connected">
        <Link to={mapCountry} params={{ id: 'cl' }}>
          Colombia
        </Link>
      </li>
      <li className="list__item list__item--connected">
        <Link to={mapCountry} params={{ id: 'kz' }}>
          Kazakhstan
        </Link>
      </li>
      <li className="list__item list__item--connected">Kyrgyzstan</li>
      <li className="list__item list__item--connected">
        Democratic Republic of Congo
      </li>
      <li className="list__item list__item--verified">Dominican Republic</li>
      <li className="list__item list__item--verified">Guadeloupe</li>
      <li className="list__item list__item--verified">Honduras</li>
      <li className="list__item list__item--verified">Liberia</li>
      <li className="list__item list__item--verified">Mauritania</li>
      <li className="list__item list__item--verified">Philippines</li>
      <li className="list__item list__item--not-verified">Puerto Rico</li>
      <li className="list__item list__item--not-verified">Saint Maarten</li>
      <li className="list__item list__item--not-verified">Virgin Islands</li>
      <li className="list__item list__item--not-verified">Sierra Leone</li>
      <li className="list__item list__item--not-verified">Australia</li>
      <li className="list__item list__item--not-verified">Austria</li>
    </ul>
  </>
);

export const MapCountries = () => (
  <>
    <Search />
    <ul className="sidebar__tabs tabs">
      <Link to={tabMap}>
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
      <Link to={tabInfo}>
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
      <Link to={tabControls}>
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
    <div className="sidebar__content">
      {useRoute(tabMap) && <p>Map</p>}
      {useRoute(tabInfo) && <CountriesList />}
      {useRoute(tabControls) && <p>Controls</p>}
    </div>
  </>
);
