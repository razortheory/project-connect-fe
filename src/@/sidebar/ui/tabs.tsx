import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import { mapCountries, mapCountry } from '~/core/routes';
import { useRoute } from '~/lib/router';

import { $isOpenPopup } from '@/country/model';
import {
  $isContentTab,
  $isControlsTab,
  $isMapTab,
  selectControlsTab,
  selectInfoTab,
  selectMapTab,
} from '@/sidebar/model';

export const Tabs = () => (
  <ul className="sidebar__tabs tabs">
    <li className="tabs__item">
      <button
        type="button"
        className={clsx('tabs__button', {
          'tabs__button--active': useStore($isMapTab),
        })}
        onClick={() => selectMapTab()}
      >
        {useStore($isOpenPopup) ? 'School' : 'Map'}
      </button>
    </li>

    <li className="tabs__item">
      <button
        type="button"
        className={clsx('tabs__button', {
          'tabs__button--active': useStore($isContentTab),
        })}
        onClick={() => selectInfoTab()}
      >
        {useRoute(mapCountry) && 'Country Info'}
        {useRoute(mapCountries) && 'Country List'}
      </button>
    </li>

    <li className="tabs__item">
      <button
        type="button"
        className={clsx('tabs__button', {
          'tabs__button--active': useStore($isControlsTab),
        })}
        onClick={() => selectControlsTab()}
      >
        Controls
      </button>
    </li>
  </ul>
);
