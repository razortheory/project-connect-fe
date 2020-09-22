import { CountryMetaData } from '~/api/types';

import { SortTypes, SortValues } from '@/map/@/sidebar/types';

export const defaultSortValue = 'amountOfDataAvailable';

export const countriesSortData: {
  [sortValue in SortValues]: {
    field: keyof CountryMetaData;
    sortType: SortTypes;
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
