import { FeatureCollection } from 'geojson';

import { SchoolSimplified } from '~/api/types';

export const getGlobalSchoolsGeoJson = (
  points: SchoolSimplified[]
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: points.map((point) => ({
      type: 'Feature',
      geometry: point.geopoint,
      properties: {
        country_integration_status: point.country_integration_status,
      },
    })),
  };
};
