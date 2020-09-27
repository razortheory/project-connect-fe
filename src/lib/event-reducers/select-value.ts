import { ChangeEvent } from 'react';

export const getSelectValue = (event: ChangeEvent<HTMLSelectElement>): string =>
  event.target.value;

export const selectValue = <T extends string>() => (
  event: ChangeEvent<HTMLSelectElement>
): T => event.target.value as T;
