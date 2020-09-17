import { Meta } from '@storybook/react';
import React from 'react';

import { Children } from '../../lib/types';
import { Search } from './search';

export default {
  title: 'Library/Search',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

const Container = ({ children }: Children) => (
  <div style={{ width: 320 }}>{children}</div>
);

export const primary = () => (
  <Container>
    <Search />
  </Container>
);
