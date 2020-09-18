import { ChangeEvent } from 'react';

import { CountryData } from '@/map/@/country/types';
import { SortTypes } from '@/map/@/sidebar/constants';

import { SortValues } from './types';

export const getInputValue = (event: ChangeEvent<HTMLInputElement>): string =>
  event.target.value;

export const getSelectSortValues = (
  event: ChangeEvent<HTMLSelectElement>
): SortValues => event.target.value as SortValues;

export const sortCallbacks = (
  a: CountryData,
  b: CountryData,
  field: keyof CountryData,
  sortType: SortTypes
): number => {
  switch (sortType) {
    case 'number':
      return (
        (b[field] as number) - (a[field] as number) ||
        // sort by alphabet items with same sort values
        a.name.localeCompare(b.name)
      );
    case 'date':
      return (
        new Date(b[field] as string).getTime() -
          new Date(a[field] as string).getTime() || a.name.localeCompare(b.name) // sort by alphabet items with same sort values
      );
    default:
      return (b[field] as number) - (a[field] as number);
  }
};
