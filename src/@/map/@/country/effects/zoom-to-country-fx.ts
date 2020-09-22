import { createEffect } from 'effector';
import { MultiPolygon, Polygon } from 'geojson';

import { ZoomToCountryBounds } from '@/map/@/country/types';
import { getPolygonBoundingBox } from '@/map/lib/get-polygon-bounding-box';

export const zoomToCountryFx = createEffect(
  ({ map, countriesGeometry, countryId, countryData }: ZoomToCountryBounds) => {
    if (!countryId || !map) return;

    const currentCountryGeometry =
      countriesGeometry?.find(
        (countryGeometry) => countryGeometry.id === countryId
      )?.geometry_simplified ?? countryData?.geometry;

    if (currentCountryGeometry) {
      const bounds = getPolygonBoundingBox(
        currentCountryGeometry as Polygon | MultiPolygon
      );

      map.fitBounds(bounds, {
        padding: { left: 360, right: 30, top: 30, bottom: 30 },
      });
    }
  }
);
