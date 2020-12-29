/* eslint-disable @typescript-eslint/naming-convention */
import { CountryWeeklyStats } from '~/api/types';
import {
  formatConnectionSpeed,
  formatNumber,
  formatPercent,
} from '~/core/formatters';

import { LOW_SPEED_MAX, MED_SPEED_MAX } from '@/week-graph/constants';

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
    schools_connectivity_unknown,
  } = countryWeeklyStats;

  const getConnectivityLevel = (): string => {
    if (connectivity_speed <= LOW_SPEED_MAX && connectivity_speed) {
      return 'average-speed__icons--low';
    }
    if (
      connectivity_speed > LOW_SPEED_MAX &&
      connectivity_speed < MED_SPEED_MAX
    ) {
      return 'average-speed__icons--medium';
    }
    if (connectivity_speed >= MED_SPEED_MAX) {
      return 'average-speed__icons--high';
    }
    return 'average-speed__icons';
  };

  return {
    schoolsTotal: formatNumber(schools_total),
    schoolsConnected: schools_connected
      ? formatNumber(schools_connected)
      : null,
    connectionSpeed: connectivity_speed
      ? formatConnectionSpeed(connectivity_speed)
      : null,
    schoolsWithNoInternet:
      schools_total - schools_connectivity_unknown
        ? formatPercent(
            schools_connectivity_no /
              (schools_total - schools_connectivity_unknown)
          )
        : 'N/A',
    hasStatistics: Boolean(schools_total),
    connectivityLevel: getConnectivityLevel(),
  };
};
