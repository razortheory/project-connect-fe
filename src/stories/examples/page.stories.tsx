import { Meta, Story } from '@storybook/react';
import React from 'react';

import { createState } from '~/lib/storybook-kit';

import * as HeaderStories from './header.stories';
import { Page, PageProps } from './page';

export default {
  title: 'Examples/Page',
  component: Page,
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = createState(Template, {
  ...HeaderStories.LoggedIn.args,
});

export const LoggedOut = createState(Template, {
  ...HeaderStories.LoggedOut.args,
});
