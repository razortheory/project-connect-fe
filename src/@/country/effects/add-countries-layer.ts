import { MapLayerMouseEvent } from 'mapbox-gl';

import { mapCountry } from '~/core/routes';

import {
  getDefaultCountryColor,
  getDefaultCountryOpacity,
} from '@/map/constants';
import { Map, StylePaintData } from '@/map/types';

export const addCountriesLayer = ({
  map,
  paintData,
}: {
  map: Map;
  paintData: StylePaintData;
}): void => {
  map.addLayer(
    {
      id: 'countries',
      type: 'fill',
      source: 'countries',
      paint: {
        'fill-color': getDefaultCountryColor(paintData),
        'fill-outline-color': paintData.background,
        'fill-opacity': getDefaultCountryOpacity(paintData),
      },
    },
    map.getLayer('schoolsGlobal') ? 'schoolsGlobal' : ''
  );

  map.addLayer({
    id: 'boundaries',
    type: 'line',
    source: 'countries',
    paint: {
      'line-color': paintData.background,
      'line-width': 1,
    },
  });

  let hoveredCountryId = 0;

  map.on('click', 'countries', (event: MapLayerMouseEvent) => {
    if (!event.features?.[0]) return;
    const selectedCountryCode = event.features[0]?.properties?.code as string;
    if (selectedCountryCode) {
      mapCountry.navigate({ code: selectedCountryCode.toLowerCase() });
    }
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

  // When the mouse leaves the countries layer, update the country state of the previously hovered feature
  map.on('mouseleave', 'countries', () => {
    if (hoveredCountryId) {
      map.setFeatureState(
        { source: 'countries', id: hoveredCountryId },
        { hover: false }
      );
    }
    hoveredCountryId = 0;
  });
};
