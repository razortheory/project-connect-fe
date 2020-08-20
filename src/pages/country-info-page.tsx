import React from 'react';

import { AppFrame } from '~/core';
import { CountryInfo } from '~/ui/components';
import { MapTemplate } from '~/ui/templates';

export const CountryInfoPage = () => (
  <AppFrame>
    <MapTemplate>
      <CountryInfo />
    </MapTemplate>
  </AppFrame>
);
