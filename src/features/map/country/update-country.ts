import { Geometry, MultiPolygon, Polygon } from 'geojson';

import { fetchCountryData } from '~/features/map/api';
import { getPolygonBoundingBox } from '~/features/map/map-data-helpers';

import { removeCountryFx, updateCountryFx } from './model';

updateCountryFx.use(async ({ map, paintData, countryId }) => {
  if (!countryId || !map) return;

  const [countryData] = await Promise.all([
    fetchCountryData(countryId),
    removeCountryFx(map),
  ]);

  map.addSource('selectedCountry', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: countryData.geometry as Geometry,
      properties: {},
    },
  });

  map.addLayer({
    id: 'selectedCountry',
    type: 'fill',
    source: 'selectedCountry',
    paint: {
      'fill-color': paintData.countrySelected,
      'fill-opacity': paintData.opacity,
      'fill-outline-color': paintData.background,
    },
  });

  map.setPaintProperty('countries', 'fill-color', paintData.countryNotSelected);

  map.setPaintProperty('countries', 'fill-outline-color', [
    'case',
    ['==', ['id'], countryId],
    paintData.countryNotSelected,
    paintData.background,
  ]);

  const bounds = getPolygonBoundingBox(
    countryData.geometry as Polygon | MultiPolygon
  );

  map.fitBounds(bounds, {
    padding: { left: 360, right: 30, top: 30, bottom: 30 },
  });
});
