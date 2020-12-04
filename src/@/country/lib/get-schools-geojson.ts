import { FeatureCollection } from 'geojson';

import { SchoolBasic } from '~/api/types';

export const getSchoolsGeoJson = (points: SchoolBasic[]): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: points.map((point) => ({
      type: 'Feature',
      properties: {
        name: point.name,
        connectivity_status: point.is_verified
          ? point.connectivity_status
          : 'notVerified',
        coverage_status: point.is_verified
          ? point.coverage_status
          : 'notVerified',
      },
      geometry: point.geopoint,
      id: point.id,
    })),
  };
};
