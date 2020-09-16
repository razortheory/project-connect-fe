import { MapLayerMouseEvent } from 'mapbox-gl';

import { mapCountry } from '~/core/routes';

import { addCountriesFx } from './model';

addCountriesFx.use(({ map, paintData, countriesGeoJson }) => {
  if (!map || !countriesGeoJson) return;

  let hoveredCountryId = 0;

  map.addSource('countries', {
    type: 'geojson',
    data: countriesGeoJson,
  });

  map.addLayer({
    id: 'countries',
    type: 'fill',
    source: 'countries',
    paint: {
      'fill-color': [
        'match',
        ['get', 'integration_status'],
        0,
        paintData.countryNotVerified,
        1,
        paintData.countryVerified,
        2,
        paintData.countryWithConnectivity,
        3,
        paintData.countryWithConnectivity,
        paintData.countryNotVerified,
      ],
      'fill-outline-color': paintData.background,
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        paintData.opacityHover,
        paintData.opacity,
      ],
    },
  });

  map.on('click', 'countries', (event: MapLayerMouseEvent) => {
    if (!event.features || !event.features[0]) {
      return;
    }
    mapCountry.navigate({ id: event.features[0].id as number });
  });

  map.on('mouseenter', 'countries', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'countries', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = '';
  });

  map.on('mousemove', 'countries', (event: MapLayerMouseEvent) => {
    if (!event.features || !event.features[0]) return;

    if (event.features.length > 0) {
      if (hoveredCountryId) {
        map.setFeatureState(
          { source: 'countries', id: hoveredCountryId },
          { hover: false }
        );
      }
      hoveredCountryId = event.features[0].id as number;
      map.setFeatureState(
        { source: 'countries', id: hoveredCountryId },
        { hover: true }
      );
    }
  });

  // When the mouse leaves the countries layer, update the country state of the
  // previously hovered feature.
  map.on('mouseleave', 'countries', () => {
    if (hoveredCountryId) {
      map.setFeatureState(
        { source: 'countries', id: hoveredCountryId },
        { hover: false }
      );
    }
    hoveredCountryId = 0;
  });
});
