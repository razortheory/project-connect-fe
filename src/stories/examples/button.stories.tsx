import React from 'react';
import { Story, Meta } from '@storybook/react';
import { create } from '~/lib/storybook-kit';

import { Button, ButtonProps } from './Button';

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

export const Primary = create(Template, {
  primary: true,
  label: 'Button',
});

export const Secondary = create(Template, {
  label: 'Button',
});

export const Large = create(Template, {
  size: 'large',
  label: 'Button',
});

export const Small = create(Template, {
  size: 'small',
  label: 'Button',
});
