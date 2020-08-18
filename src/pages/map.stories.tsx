import { Meta } from '@storybook/react';
import { create } from '~/lib/storybook-kit';
import { MapPage } from '~/pages/MapPage';

export default {
  title: 'Pages/Map',
  component: MapPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => null,
    },
  },
} as Meta;

export const Map = create(MapPage);
