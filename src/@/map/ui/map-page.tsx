import React from 'react';
import styled from 'styled-components';

import { Layout, Main } from '~/ui/components';

import { Popup } from '@/map/@/country';
import { Sidebar } from '@/map/@/sidebar';

import { Footer } from './footer';
import { Header } from './header';
import { Map } from './map';
import { Underlay } from './underlay';

const PopupContainer = styled.div`
  display: none;
`;

export const MapPage = () => (
  <Layout>
    <Underlay>
      <Map />
    </Underlay>
    <Header />
    <Main>
      <Sidebar />
      <PopupContainer>
        <Popup />
      </PopupContainer>
    </Main>
    <Footer />
  </Layout>
);
