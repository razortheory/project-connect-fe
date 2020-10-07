import clsx from 'clsx';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { mapCountries, mapCountry, mapOverview } from '~/core/routes';
import { tabMap } from '~/core/tab-routes';
import { useRoute } from '~/lib/router';

import {
  $isSidebarCollapsed,
  onClickSidebar,
  toggleSidebar,
} from '@/map/@/sidebar/model';

import { CountryInfo } from './country-info';
import { CountryList } from './country-list';
import { $isMobile } from './view-model';
import { WorldView } from './world-view';

// View logic
const $showMap = combine(
  $isMobile,
  tabMap.visible,
  mapOverview.visible,
  (isMobile, tabMapVisible, mapOverviewVisible) =>
    isMobile && tabMapVisible && !mapOverviewVisible
);

const onToggleSidebar = toggleSidebar.prepend<MouseEvent<HTMLButtonElement>>(
  (event) => event.stopPropagation()
);

export const Sidebar = () => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
  <div
    className={clsx('sidebar', {
      'sidebar--collapsed': useStore($isSidebarCollapsed),
      'sidebar--show-map': useStore($showMap),
    })}
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
      onClick={onToggleSidebar}
    >
      <Chevron alt="Expand/collapse sidebar" />
    </button>
  </div>
);
