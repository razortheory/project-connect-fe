import { createEffect } from 'effector';
import { MultiPolygon, Polygon } from 'geojson';

import { getPolygonBoundingBox } from '@/map/@/country/lib';
import { ZoomToCountryBounds } from '@/map/@/country/types';

export const zoomToCountryFx = createEffect(
  ({
    map,
    countriesGeometry,
    countryId,
    country,
    isMobile,
  }: ZoomToCountryBounds): number => {
    if (!countryId || !map) return 0;

    const currentCountryGeometry =
      countriesGeometry?.find(
        (countryGeometry) => countryGeometry.id === countryId
      )?.geometry_simplified ?? country?.geometry;

    if (currentCountryGeometry) {
      const bounds = getPolygonBoundingBox(
        currentCountryGeometry as Polygon | MultiPolygon
      );

      map.fitBounds(bounds, {
        padding: {
          left: isMobile ? 5 : 360,
          right: isMobile ? 5 : 30,
          top: isMobile ? 50 : 30,
          bottom: isMobile ? 5 : 30,
        },
      });
      return countryId;
    }
    return 0;
  }
);
