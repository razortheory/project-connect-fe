/* eslint-disable @typescript-eslint/naming-convention */

import { School } from '~/api/types';
import { formatConnectionSpeed } from '~/core/formatters';

import { SchoolInfo } from '@/popup/types';

const getCoverageType = (type: string): string => {
  switch (type) {
    case 'no':
      return 'No';
    case '2g':
      return '2G';
    case '3g':
      return '3G';
    case '4g':
      return '4G';
    case 'unknown':
      return 'Unknown';
    default:
      return type;
  }
};

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
    is_verified,
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
    coverageType: getCoverageType(coverage_type),
    regionClassification: environment || 'No data',
    coverageStatus: coverage_status,
    isVerified: is_verified,
  };
};
