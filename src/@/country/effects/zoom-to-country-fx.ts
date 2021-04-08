import { createEffect } from 'effector';
import { MultiPolygon, Polygon } from 'geojson';

import { getPolygonBoundingBox } from '@/country/lib';
import { ZoomToCountryBounds } from '@/country/types';

const paddingMobile = {
  left: 5,
  right: 5,
  top: 50,
  bottom: 5,
};

const paddingDesktop = {
  left: 360,
  right: 30,
  top: 30,
  bottom: 30,
};

export const zoomToCountryFx = createEffect(
  ({
    map,
    countriesGeometry,
    countryCode,
    country,
    isMobile,
  }: ZoomToCountryBounds): string => {
    if (!countryCode || !map) return '';

    const currentCountryGeometry =
      countriesGeometry?.find(
        (countryGeometry) =>
          countryGeometry.code.toLocaleLowerCase() ===
          countryCode.toLocaleLowerCase()
      )?.geometry_simplified ?? country?.geometry;

    if (currentCountryGeometry) {
      const bounds = getPolygonBoundingBox(
        currentCountryGeometry as Polygon | MultiPolygon
      );

      map.fitBounds(bounds, {
        padding: isMobile ? paddingMobile : paddingDesktop,
      });

      return countryCode;
    }

    return '';
  }
);
