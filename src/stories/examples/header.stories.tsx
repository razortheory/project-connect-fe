import React from 'react';
import { Story, Meta } from '@storybook/react';
import { create } from '~/lib/storybook-kit';

import { Header, HeaderProps } from './Header';

export default {
  title: 'Examples/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
} as Required<Meta>;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = create(Template, {
  user: {},
});

export const LoggedOut = create(Template);
