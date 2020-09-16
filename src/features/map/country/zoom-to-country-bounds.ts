import { MultiPolygon, Polygon } from 'geojson';

import { getPolygonBoundingBox } from '~/features/map/map-data-helpers';

import { zoomToCountryBoundsFx } from './model';

zoomToCountryBoundsFx.use(({ map, countriesGeometry, countryId }) => {
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
});
