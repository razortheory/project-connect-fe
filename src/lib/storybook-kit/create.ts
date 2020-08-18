import { Story } from '@storybook/react';

export const create = <Props>(
  SourceTemplate: Story<Props>,
  args?: Props
): Story<Props> => {
  const Template = SourceTemplate.bind({});
  if (args) Template.args = args;
  return Template;
};
