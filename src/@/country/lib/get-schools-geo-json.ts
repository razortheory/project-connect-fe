import { FeatureCollection } from 'geojson';

import { SchoolBasic } from '~/api/types';

export const getSchoolsGeoJson = (points: SchoolBasic[]): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: points.map((point) => ({
      type: 'Feature',
      properties: {
        name: point.name,
        connectivity_status: point.connectivity_status,
        coverage_status: point.coverage_status,
      },
      geometry: point.geopoint,
      id: point.id,
    })),
  };
};
