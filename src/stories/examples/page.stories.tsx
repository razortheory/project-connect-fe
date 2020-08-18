import React from 'react';
import { Story, Meta } from '@storybook/react';
import { create } from '~/lib/storybook-kit';

import { Page, PageProps } from './Page';
import * as HeaderStories from './header.stories';

export default {
  title: 'Examples/Page',
  component: Page,
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = create(Template, {
  ...HeaderStories.LoggedIn.args,
});

export const LoggedOut = create(Template, {
  ...HeaderStories.LoggedOut.args,
});
