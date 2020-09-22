import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { mapCountries, mapCountry, mapOverview } from '~/core/routes';
import { useRoute } from '~/lib/router';

import {
  $isSidebarHidden,
  onClickSidebar,
  toggleSidebarVisibility,
} from '@/map/@/sidebar/model';

import { CountryInfo } from './country-info';
import { CountryList } from './country-list';
import { WorldView } from './world-view';

// View logic
const onToggleSidebarVisibility = toggleSidebarVisibility.prepend<
  MouseEvent<HTMLButtonElement>
>((event) => event.stopPropagation());

export const Sidebar = () => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
  <div
    className={`sidebar${
      useStore($isSidebarHidden) ? ' sidebar--collapsed' : ''
    }`}
    onClick={onClickSidebar}
  >
    <div className="sidebar__container">
      {useRoute(mapOverview) && <WorldView />}
      {useRoute(mapCountries) && <CountryList />}
      {useRoute(mapCountry) && <CountryInfo />}
    </div>
    <button
      className="sidebar__expander"
      type="button"
      onClick={onToggleSidebarVisibility}
    >
      <Chevron alt="Expand/collapse sidebar" />
    </button>
  </div>
);
