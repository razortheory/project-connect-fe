import { createEffect } from 'effector';
import { MultiPolygon, Polygon } from 'geojson';

import { ZoomToCountryBounds } from '@/map/@/country/types';
import { getPolygonBoundingBox } from '@/map/lib/get-polygon-bounding-box';

export const zoomToCountryFx = createEffect(
  ({ map, countriesGeometry, countryId }: ZoomToCountryBounds) => {
    if (!countryId || !map || !countriesGeometry) return;

    const countryData = countriesGeometry.find(
      (countryGeometry) => countryGeometry.id === countryId
    );

    const bounds = getPolygonBoundingBox(
      countryData?.geometry_simplified as Polygon | MultiPolygon
    );

    map.fitBounds(bounds, {
      padding: { left: 360, right: 30, top: 30, bottom: 30 },
    });
  }
);
