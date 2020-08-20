import React from 'react';

import { Map } from '~/features/map';
import { Children } from '~/lib/types';
import {
  Layout,
  Main,
  MapBrowser,
  MapFooter,
  MapHeader,
  MapUnderlay,
} from '~/ui/components';

export const MapTemplate = ({ children }: Children) => (
  <Layout>
    <MapUnderlay>
      <Map />
    </MapUnderlay>
    <MapHeader />
    <Main>
      <MapBrowser>{children}</MapBrowser>
    </Main>
    <MapFooter />
  </Layout>
);
