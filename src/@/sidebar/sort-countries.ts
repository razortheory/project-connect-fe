import { CountryBasic, IntegrationStatus } from '~/api/types';

import { countriesSortData } from './constants';
import { SortKey } from './types';

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
        // Sort by alphabet items with same sort values
        a.name.localeCompare(b.name)
      );
    case 'integration_status': {
      const getIntegrationStatusSortAlias = (
        value: IntegrationStatus
      ): number => {
        if (value === 4) {
          return -2;
        }
        if (value === 5) {
          return -1;
        }
        return value;
      };
      return (
        getIntegrationStatusSortAlias(b[field] as IntegrationStatus) -
          getIntegrationStatusSortAlias(a[field] as IntegrationStatus) ||
        // Sort by alphabet items with same sort values
        a.name.localeCompare(b.name)
      );
    }
    case 'schools_with_data_percentage': {
      const getIntegrationStatusSortAlias = (
        value: IntegrationStatus
      ): number => {
        if (value === 4) {
          return -2;
        }
        if (value === 5) {
          return -1;
        }
        if (value === 3) {
          return 2;
        }
        return value;
      };
      return (
        getIntegrationStatusSortAlias(b.integration_status) -
          getIntegrationStatusSortAlias(a.integration_status) ||
        b.schools_with_data_percentage - a.schools_with_data_percentage
      );
    }
    case 'date':
      return (
        new Date(b[field] as string).getTime() -
          new Date(a[field] as string).getTime() || a.name.localeCompare(b.name) // Sort by alphabet items with same sort values
      );
    default:
      return (b[field] as number) - (a[field] as number);
  }
};
