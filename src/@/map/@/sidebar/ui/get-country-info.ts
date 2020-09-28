/* eslint-disable @typescript-eslint/naming-convention */
import { CountryStatistics } from '~/api/types';
import { formatNumber, formatPercent } from '~/core/formatters';
import { humanFormat } from '~/lib/human-format';

import { CountryInfo } from './types';

export const getCountryInfo = (
  countryStatistics: CountryStatistics | null
): CountryInfo | null => {
  if (!countryStatistics) return null;

  const {
    schools_total,
    schools_connected,
    connectivity_speed,
    schools_connectivity_no,
  } = countryStatistics;

  return {
    schoolsTotal: formatNumber(schools_total),
    schoolsConnected: formatNumber(schools_connected),
    connectivitySpeed: humanFormat(connectivity_speed, {
      unit: 'b/s',
      separator: ' ',
    }),
    schoolsWithNoInternet: schools_total
      ? formatPercent(schools_connectivity_no / schools_total)
      : 'N/A',
    hasStatistics: Boolean(schools_total),
  };
};
