import { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import { LngLatLike } from 'mapbox-gl';

import { CountryGeometryData, SchoolData } from './types';

export const convertSchoolsDataToGeoJson = (
  points: SchoolData[]
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: points.map((point) => ({
      type: 'Feature',
      properties: {
        name: point.name,
      },
      geometry: point.geopoint,
      id: point.id,
    })),
  };
};

export const convertCountriesDataToGeoJson = (
  countries: CountryGeometryData[]
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: countries.map((country) => {
      return {
        type: 'Feature',
        properties: {
          // demo
          connectivity:
            country.id === 32 || country.id === 37 ? 'connectivity' : '',
        },
        geometry: country.geometry_simplified,
        id: country.id,
      };
    }),
  };
};

export const getPolygonBoundingBox = (
  feature: Feature<MultiPolygon | Polygon>
): [LngLatLike, LngLatLike] => {
  // longitude -180 - 180
  // latitude -90 - 90
  let maxLng = -180;
  let minLng = 180;
  let maxLat = -90;
  let minLat = 90;

  for (const coordinates of feature.geometry.coordinates) {
    const polygon =
      typeof coordinates[0][0] === 'number' ? coordinates : coordinates[0];

    for (const element of polygon) {
      const [longitude, latitude] = element as [number, number];
      minLng = Math.min(minLng, longitude);
      maxLng = Math.max(maxLng, longitude);
      minLat = Math.min(minLat, latitude);
      maxLat = Math.max(maxLat, latitude);
    }
  }
  // bounds [xMin, yMin][xMax, yMax]
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
};
