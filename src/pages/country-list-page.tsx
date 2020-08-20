import React from 'react';

import { AppFrame } from '~/core';
import { CountryList } from '~/ui/components';
import { MapTemplate } from '~/ui/templates';

export const CountryListPage = () => (
  <AppFrame>
    <MapTemplate>
      <CountryList />
    </MapTemplate>
  </AppFrame>
);
