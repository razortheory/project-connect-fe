import { useStore } from 'effector-react';
import React from 'react';

import { mapCountries, mapCountry } from '~/core/routes';
import { tabControls, tabInfo, tabMap } from '~/core/tab-routes';
import { Link, useRoute } from '~/lib/router';

import { $isOpenPopup } from '@/map/@/country/model';

export const Tabs = () => (
  <ul className="sidebar__tabs tabs">
    <li className="tabs__item">
      <Link to={tabMap}>
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabMap) ? 'tabs__button--active' : ''
          }`}
        >
          {useStore($isOpenPopup) ? 'School' : 'Map'}
        </button>
      </Link>
    </li>

    <li className="tabs__item">
      <Link to={tabInfo}>
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabInfo) ? 'tabs__button--active' : ''
          }`}
        >
          {useRoute(mapCountry) && 'Country Info'}
          {useRoute(mapCountries) && 'Country List'}
        </button>
      </Link>
    </li>

    <li className="tabs__item">
      <Link to={tabControls}>
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabControls) ? 'tabs__button--active' : ''
          }`}
        >
          Controls
        </button>
      </Link>
    </li>
  </ul>
);
