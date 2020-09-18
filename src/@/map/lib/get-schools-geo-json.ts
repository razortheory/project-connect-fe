import { FeatureCollection } from 'geojson';

import { SchoolData } from '@/map/types';

export const getSchoolsGeoJson = (points: SchoolData[]): FeatureCollection => {
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
