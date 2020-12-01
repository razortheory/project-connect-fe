import { CountryBasic } from '~/api/types';
import { getInterval } from '~/lib/date-fns-kit';
// eslint-disable-next-line no-restricted-imports
import { DropdownItem } from '~/ui/dropdown';

import { SortKey, SortType } from '@/sidebar/types';

export const defaultInterval = getInterval(new Date(), 'week');

export const defaultSortKey = 'countryProgress';

export const countriesSortData: {
  [key in SortKey]: {
    field: keyof CountryBasic;
    sortType: SortType;
  };
} = {
  amountOfDataAvailable: {
    field: 'schools_total',
    sortType: 'number',
  },
  dateOfJoining: {
    field: 'date_of_join',
    sortType: 'date',
  },
  countryProgress: {
    field: 'integration_status',
    sortType: 'integration_status',
  },
  percentSchoolWithConnectivity: {
    field: 'schools_with_data_percentage',
    sortType: 'number',
  },
};

export const dropdownCountriesSortData: Array<DropdownItem<SortKey>> = [
  { value: 'amountOfDataAvailable', title: 'Amount of data available' },
  { value: 'dateOfJoining', title: 'Date of joining' },
  { value: 'countryProgress', title: 'Country progress' },
  {
    value: 'percentSchoolWithConnectivity',
    title: '% Schools with connectivity',
  },
];
