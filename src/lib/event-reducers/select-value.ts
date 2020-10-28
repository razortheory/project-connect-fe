import { ChangeEvent } from 'react';

export const getSelectValue = (event: ChangeEvent<HTMLSelectElement>): string =>
  event.target.value;
