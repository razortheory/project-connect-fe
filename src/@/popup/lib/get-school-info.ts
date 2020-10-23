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
    statistics: { connectivity_type, connectivity_speed, connectivity_status },
    environment,
    coverage_status,
  } = school;

  const connectionSpeed = formatConnectionSpeed(connectivity_speed);

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
    coverageStatus: coverage_status || 'unknown',
    regionClassification: environment || 'No data',
  };
};
