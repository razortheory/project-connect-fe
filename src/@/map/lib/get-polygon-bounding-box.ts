import { MultiPolygon, Polygon } from 'geojson';
import { LngLatLike } from 'mapbox-gl';

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
