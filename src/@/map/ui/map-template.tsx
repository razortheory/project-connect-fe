import React from 'react';

import { Layout, Main } from '~/ui/components';

import { Popup } from '@/map/@/country';
import { Sidebar } from '@/map/@/sidebar';

import { Footer } from './footer';
import { Header } from './header';
import { Map } from './map';
import { Underlay } from './underlay';

export const MapTemplate = () => (
  <Layout>
    <Underlay>
      <Map />
      <Popup />
    </Underlay>
    <Header />
    <Main>
      <Sidebar />
    </Main>
    <Footer />
  </Layout>
);
