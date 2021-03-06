import { ChangeEvent } from 'react';

export const getInputValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): string =>
  event.target.value;

export const inputValue = <T extends string>() => (
  event: ChangeEvent<HTMLInputElement>
): T => event.target.value as T;
