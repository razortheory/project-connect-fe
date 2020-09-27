import { CountryBasic } from '~/api/types';

import { SortKey, SortType } from '@/map/@/sidebar/types';

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
    sortType: 'number',
  },
  percentSchoolWithConnectivity: {
    field: 'schools_with_data_percentage',
    sortType: 'number',
  },
};
