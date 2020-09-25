import { SchoolDetailsData } from '~/api/types';
import { humanFormat } from '~/lib/human-format';

import { SchoolDetails } from './types';

export const DumpSchoolDetails: SchoolDetailsData = {
  id: 59366,
  name: 'No school data',
  geopoint: {
    type: 'Point',
    coordinates: [-4.815, -16.2342],
  },
  statistics: {
    num_students: 0,
    num_teachers: 0,
    num_classroom: 0,
    num_latrines: 0,
    running_water: false,
    electricity_availability: false,
    computer_lab: true,
    num_computers: 0,
    connectivity: true,
    connectivity_status: 'no',
    connectivity_type: 'No data',
    connectivity_speed: 0,
    connectivity_latency: 45,
    connectivity_availability: 0,
    created: '2020-09-22T01:16:14.322623Z',
    modified: '2020-09-24T06:03:53.697609Z',
  },
  gps_confidence: null,
  address: '',
  postal_code: '',
};

const getConnectivityClassname = (connectivity: string) => {
  switch (connectivity) {
    case 'unknown':
      return 'country-popup__unavailable';
    case 'no':
      return 'country-popup__no-connectivity';
    case 'moderate':
      return 'country-popup__moderate';
    case 'good':
      return 'country-popup__good';
    default:
      return 'country-popup__unavailable';
  }
};

export const getSchoolDetails = (school: SchoolDetailsData): SchoolDetails => {
  const {
    id,
    name: schoolName,
    address: schoolAddress,
    postal_code: postalCode,
    gps_confidence: gpsConfidence,
    geopoint,
    statistics,
  } = school;

  const internetSpeed = humanFormat(statistics.connectivity_speed, {
    unit: 'mb/s',
    separator: ' ',
  });

  return {
    id,
    schoolName,
    schoolAddress,
    postalCode,
    gpsConfidence,
    popupClassname: getConnectivityClassname(statistics.connectivity_status),
    internetSpeed,
    connectivityType: statistics.connectivity_type,
    latitude: geopoint.coordinates[0],
    longitude: geopoint.coordinates[1],
    coverage: 'No data',
    region: 'No data',
  };
};
