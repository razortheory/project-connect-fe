/* eslint-disable @typescript-eslint/naming-convention */
import { CountryWeeklyStats } from '~/api/types';
import {
  formatConnectionSpeed,
  formatNumber,
  formatPercent,
} from '~/core/formatters';

import { CountryInfo } from './types';

export const getCountryInfo = (
  countryWeeklyStats: CountryWeeklyStats | null
): CountryInfo | null => {
  if (!countryWeeklyStats) return null;

  const {
    schools_total,
    schools_connected,
    connectivity_speed,
    schools_connectivity_no,
  } = countryWeeklyStats;

  return {
    schoolsTotal: formatNumber(schools_total),
    schoolsConnected: formatNumber(schools_connected),
    connectionSpeed: formatConnectionSpeed(connectivity_speed),
    schoolsWithNoInternet: schools_total
      ? formatPercent(schools_connectivity_no / schools_total)
      : 'N/A',
    hasStatistics: Boolean(schools_total),
  };
};
