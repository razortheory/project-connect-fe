import { Meta } from '@storybook/react';
import React from 'react';

import { Children } from '~/lib/types';

import { Header } from './header';

export default {
  title: 'Library/Header',
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

const Container = ({ children }: Children) => (
  <div style={{ backgroundColor: '#646a72', width: '100%' }}>{children}</div>
);

export const primary = () => (
  <Container>
    <Header />
  </Container>
);
