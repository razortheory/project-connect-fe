import { CountryBasic } from '~/api/types';
import { getInterval } from '~/lib/date-fns-kit';

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
    sortType: 'number',
  },
  percentSchoolWithConnectivity: {
    field: 'schools_with_data_percentage',
    sortType: 'number',
  },
};
