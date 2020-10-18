import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';

import { Layout, Main } from '~/ui';

import { $isOpenHistoryModal } from '@/country/model';
import { HistoryModal, Popup } from '@/country/ui';
import { Sidebar } from '@/sidebar/ui';

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
      {useStore($isOpenHistoryModal) && <HistoryModal />}
    </Main>
    <Footer />
  </Layout>
);
