import { Country } from '~/api/types';
import { formatNumber, formatPercent } from '~/core/formatters';
import { humanFormat } from '~/lib/human-format';

import { CountryInfo } from './types';

export const getCountryInfo = (country: Country | null): CountryInfo | null => {
  if (!country) return null;

  const { statistics } = country;

  return {
    name: country.name,
    dataSource: country.data_source || 'N/A',
    schoolsTotal: formatNumber(statistics.schools_total),
    schoolsConnected: formatNumber(statistics.schools_connected),
    connectivitySpeed: humanFormat(statistics.connectivity_speed, {
      unit: 'b/s',
      separator: ' ',
    }),
    schoolsWithNoInternet: statistics.schools_total
      ? formatPercent(
          statistics.schools_connectivity_no / statistics.schools_total
        )
      : 'N/A',
  };
};
