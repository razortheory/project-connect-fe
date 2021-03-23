import { CountryBasic } from '~/api/types';
import { getInterval } from '~/lib/date-fns-kit';
// eslint-disable-next-line no-restricted-imports
import { DropdownItem } from '~/ui/dropdown';
// eslint-disable-next-line import/named,import/no-cycle,no-restricted-imports
import { DropdownPurposeData } from '~/ui/join-us-dropdown';

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
    sortType: 'schools_with_data_percentage',
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

export const dropdownPurposeData: DropdownPurposeData[] = [
  { value: 'I want to join', title: 'I want to join' },
  { value: 'I want to share data', title: 'I want to share data' },
  { value: 'I want to volunteer', title: 'I want to volunteer' },
  { value: 'I want to be a partner', title: 'I want to be a partner' },
  { value: 'Other', title: 'Other' },
];
