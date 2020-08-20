import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { Children } from '~/lib/types';

export const MapBrowser = ({ children }: Children) => (
  <div className="sidebar">
    <div className="sidebar__container">{children}</div>
    <button className="sidebar__expander" type="button">
      <Chevron alt="Expand/collapse sidebar" />
    </button>
  </div>
);
