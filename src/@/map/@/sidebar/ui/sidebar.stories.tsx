import { Meta } from '@storybook/react';
import React from 'react';

import { CountryInfo } from './country-info';
import { CountryList } from './country-list';
import { Sidebar } from './sidebar';
import { WorldView } from './world-view';

export default {
  title: 'Library/Sidebar',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

export const empty = Sidebar;

export const overview = () => (
  <Sidebar>
    <WorldView />
  </Sidebar>
);

export const countries = () => (
  <Sidebar>
    <CountryList />
  </Sidebar>
);

export const country = () => (
  <Sidebar>
    <CountryInfo />
  </Sidebar>
);
