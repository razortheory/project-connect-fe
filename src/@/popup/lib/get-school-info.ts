/* eslint-disable @typescript-eslint/naming-convention */

import { School } from '~/api/types';
import { formatConnectionSpeed } from '~/core/formatters';

import { SchoolInfo } from '@/popup/types';

export const getSchoolInfo = (school: School): SchoolInfo => {
  const {
    id,
    name,
    address,
    postal_code,
    gps_confidence,
    geopoint: {
      coordinates: [latitude, longitude],
    },
    statistics: {
      connectivity_type,
      connectivity_speed,
      connectivity,
      coverage_type,
    },
    environment,
    connectivity_status,
    coverage_status,
  } = school;

  const connectionSpeed =
    connectivity_speed === null
      ? 'No data'
      : formatConnectionSpeed(connectivity_speed);

  return {
    id,
    name,
    address,
    postalCode: postal_code,
    gpsConfidence: gps_confidence,
    connectivityStatus: connectivity_status,
    connectionSpeed,
    connectivityType: connectivity_type,
    latitude,
    longitude,
    networkCoverage: 'No data',
    connectivity,
    coverageType: coverage_type,
    regionClassification: environment || 'No data',
    coverageStatus: coverage_status,
  };
};
