import { createEvent, guard } from 'effector';
import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { Children } from '~/lib/types';

import {
  $isSidebarHidden,
  toggleSidebarVisibility,
} from '@/map/@/sidebar/model';

// View logic
const onToggleSidebarVisibility = toggleSidebarVisibility.prepend<
  MouseEvent<HTMLButtonElement>
>((event) => event.stopPropagation());

const onClickMapBrowser = createEvent<MouseEvent<HTMLDivElement>>();

guard({
  source: onClickMapBrowser,
  filter: $isSidebarHidden,
  target: toggleSidebarVisibility,
});

export const Sidebar = ({ children }: Children) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
  <div
    className={`sidebar${
      useStore($isSidebarHidden) ? ' sidebar--collapsed' : ''
    }`}
    onClick={onClickMapBrowser}
  >
    <div className="sidebar__container">{children}</div>
    <button
      className="sidebar__expander"
      type="button"
      onClick={onToggleSidebarVisibility}
    >
      <Chevron alt="Expand/collapse sidebar" />
    </button>
  </div>
);
