import React from 'react';

import { AppFrame } from '~/core';
import { WorldInfo } from '~/ui/components';
import { MapTemplate } from '~/ui/templates';

export const WorldInfoPage = () => (
  <AppFrame>
    <MapTemplate>
      <WorldInfo />
    </MapTemplate>
  </AppFrame>
);
