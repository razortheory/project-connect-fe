import { Meta } from '@storybook/react';

import { CountryInfoPage } from './country-info-page';
import { CountryListPage } from './country-list-page';
import { WorldInfoPage } from './world-info-page';

export default {
  title: 'Pages/Map',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => null,
    },
  },
} as Meta;

export const worldInfo = WorldInfoPage;
export const countryList = CountryListPage;
export const countryInfo = CountryInfoPage;
