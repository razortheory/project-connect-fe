import { FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import { LngLatLike } from 'mapbox-gl';

import {
  ConnectivityStatus,
  CountryData,
  CountryGeometryData,
  SchoolData,
} from './types';

export const convertSchoolsDataToGeoJson = (
  points: SchoolData[]
): FeatureCollection => {
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

export const combineCountriesDataToGeoJson = (
  countriesProperties: CountryData[] | null,
  countriesGeometry: CountryGeometryData[] | null
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features:
      countriesGeometry?.map((country) => {
        const countryData = countriesProperties?.find(
          (countryProperties) => countryProperties.id === country.id
        );
        return {
          type: 'Feature',
          properties: {
            integration_status: countryData?.integration_status,
            schools_with_data_percentage:
              countryData?.schools_with_data_percentage,
            code: countryData?.code,
          },
          geometry: country.geometry_simplified,
          id: country.id,
        };
      }) ?? [],
  };
};

export const getPolygonBoundingBox = (
  geometry: Polygon | MultiPolygon
): [LngLatLike, LngLatLike] => {
  // longitude -180 - 180
  // latitude -90 - 90
  let maxLng = -180;
  let minLng = 180;
  let maxLat = -90;
  let minLat = 90;

  for (const coordinates of geometry.coordinates) {
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
