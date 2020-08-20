import { Meta, Story } from '@storybook/react';
import React from 'react';

import { createState } from '~/lib/storybook-kit';

import { Header, HeaderProps } from './header';

export default {
  title: 'Examples/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
} as Required<Meta>;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = createState(Template, {
  user: {},
});

export const LoggedOut = createState(Template);
