/* eslint-disable @typescript-eslint/naming-convention */

import { School } from '~/api/types';
import { humanFormat } from '~/lib/human-format';

import { SchoolInfo } from './types';

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
  } = school;

  const connectivitySpeed = humanFormat(connectivity_speed, {
    // TODO: Format unit on front-end
    unit: 'b/s',
    separator: ' ',
  });

  return {
    id,
    name,
    address,
    postalCode: postal_code,
    gpsConfidence: gps_confidence,
    connectivityStatus: connectivity_status,
    connectivitySpeed,
    connectivityType: connectivity_type,
    latitude,
    longitude,
    coverage: 'No data',
    region: 'No data',
  };
};
