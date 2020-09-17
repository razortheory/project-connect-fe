import React from 'react';

import { Map } from '~/features/map';
import { Sidebar } from '~/features/sidebar';
import { Children } from '~/lib/types';
import {
  Layout,
  Main,
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
      <Sidebar>{children}</Sidebar>
    </Main>
    <MapFooter />
  </Layout>
);
