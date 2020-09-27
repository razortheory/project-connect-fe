import { CountryMetaData } from '~/api/types';

import { SortType, SortValue } from '@/map/@/sidebar/types';

export const defaultSortValue = 'countryProgress';

export const countriesSortData: {
  [sortValue in SortValue]: {
    field: keyof CountryMetaData;
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
