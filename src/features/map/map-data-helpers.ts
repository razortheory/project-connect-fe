import {
  Feature,
  FeatureCollection,
  Geometry,
  GeometryCollection,
  GeometryObject,
  MultiPolygon,
} from 'geojson';
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';

export type SchoolData = {
  id: number;
  name: string;
  geopoint: Geometry;
};
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

export type CountryData = {
  id: number;
  name: string;
  flag: string;
  code: string;
  geometry_simplified: Geometry;
};

export const convertCountriesDataToGeoJson = (
  countries: CountryData[]
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: countries.map((country) => {
      return {
        type: 'Feature',
        properties: {
          name: country.name,
          flag: country.flag,
          code: country.code,
        },
        geometry: country.geometry_simplified,
        id: country.id,
      };
    }),
  };
};

export const getPolygonBoundingBox = (
  feature: Feature<MultiPolygon>
): [LngLatLike, LngLatLike] => {
  // longitude -180 - 180
  // latitude -90 - 90
  let maxLng = -180;
  let minLng = 180;
  let maxLat = -90;
  let minLat = 90;

  for (const coordinates of feature.geometry.coordinates) {
    const [polygon] =
      feature.geometry.coordinates.length === 1
        ? // Polygon coordinates[0][nodes]
          feature.geometry.coordinates
        : coordinates;

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
