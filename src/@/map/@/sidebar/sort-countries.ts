import { CountryBasic } from '~/api/types';

import { SortKey } from '@/map/@/sidebar/types';

import { countriesSortData } from './constants';

export const sortCountries = (
  a: CountryBasic,
  b: CountryBasic,
  sortKey: SortKey
): number => {
  const { field, sortType } = countriesSortData[sortKey];

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
