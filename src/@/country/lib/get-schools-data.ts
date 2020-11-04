import { FeatureCollection } from 'geojson';

import { ConnectivityStatus, CoverageType, SchoolBasic } from '~/api/types';

export type SchoolsData = {
  geojson: FeatureCollection;
  hasConnectivityStatus: boolean;
  hasConnectivity: boolean;
  hasCoverageType: boolean;
  hasCoverageAvailability: boolean;
};

export const getStringConnectivity = (
  status: boolean | null
): ConnectivityStatus => {
  switch (status) {
    case true:
      return 'good';
    case false:
      return 'no';
    case null:
      return 'unknown';
    default:
      return 'unknown';
  }
};

export const getAliasForCoverageType = (
  coverageType: CoverageType
): ConnectivityStatus => {
  switch (coverageType) {
    case 'unknown':
      return 'unknown';
    case 'no':
      return 'no';
    case '2g':
      return 'moderate';
    case '3g':
      return 'good';
    case '4g':
      return 'good';
    default:
      return 'unknown';
  }
};

export const getSchoolsData = (points: SchoolBasic[]): SchoolsData => {
  // eslint-disable-next-line unicorn/no-reduce
  return points.reduce<SchoolsData>(
    (accum, point) => {
      if (point.connectivity_status !== 'unknown') {
        // eslint-disable-next-line no-param-reassign
        accum.hasConnectivityStatus = true;
      }
      if (point.connectivity !== null) {
        // eslint-disable-next-line no-param-reassign
        accum.hasConnectivity = true;
      }
      if (point.coverage_type !== 'unknown') {
        // eslint-disable-next-line no-param-reassign
        accum.hasCoverageType = true;
      }
      if (point.coverage_availability !== null) {
        // eslint-disable-next-line no-param-reassign
        accum.hasCoverageAvailability = true;
      }
      accum.geojson.features.push({
        type: 'Feature',
        properties: {
          name: point.name,
          connectivity_status: point.connectivity_status,
          connectivity: getStringConnectivity(point.connectivity),
          coverage_type: getAliasForCoverageType(point.coverage_type),
          coverage_availability: getStringConnectivity(
            point.coverage_availability
          ),
        },
        geometry: point.geopoint,
        id: point.id,
      });
      return accum;
    },
    {
      geojson: {
        type: 'FeatureCollection',
        features: [],
      },
      hasConnectivityStatus: false,
      hasConnectivity: false,
      hasCoverageType: false,
      hasCoverageAvailability: false,
    }
  );
};
