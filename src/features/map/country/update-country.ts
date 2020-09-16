import { Geometry } from 'geojson';

import { removeCountryFx, updateCountryFx } from './model';

updateCountryFx.use(async ({ map, paintData, countryData }) => {
  if (!countryData || !map) return;

  await Promise.all([removeCountryFx(map)]);

  map.addSource('selectedCountry', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: countryData.geometry as Geometry,
      properties: {},
    },
  });

  map.addLayer(
    {
      id: 'selectedCountry',
      type: 'fill',
      source: 'selectedCountry',
      paint: {
        'fill-color': paintData.countrySelected,
        'fill-opacity': paintData.opacity,
        'fill-outline-color': paintData.background,
      },
    },
    // country layer always below schools layer
    map.getLayer('schools') ? 'schools' : ''
  );

  map.setPaintProperty('countries', 'fill-color', paintData.countryNotSelected);

  map.setPaintProperty('countries', 'fill-outline-color', [
    'case',
    ['==', ['id'], countryData.id],
    paintData.countryNotSelected,
    paintData.background,
  ]);
});
