import React from 'react';

import { Children } from '~/lib/types';

export const Underlay = ({ children }: Children) => (
  <div className="map-placeholder">{children}</div>
);
