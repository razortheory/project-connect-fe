import { Meta, Story } from '@storybook/react';
import React from 'react';

import { createState } from '~/lib/storybook-kit';

import { Button, ButtonProps } from './button';

export default {
  title: 'Examples/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <div>
    <Button {...args} />
  </div>
);

export const Primary = createState(Template, {
  primary: true,
  label: 'Button',
});

export const Secondary = createState(Template, {
  label: 'Button',
});

export const Large = createState(Template, {
  size: 'large',
  label: 'Button',
});

export const Small = createState(Template, {
  size: 'small',
  label: 'Button',
});
