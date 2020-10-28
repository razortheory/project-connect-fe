import { createEffect } from 'effector';
import { MapLayerMouseEvent } from 'mapbox-gl';

import { mapCountry } from '~/core/routes';

import { AddCountries } from '@/country/types';
import {
  getDefaultCountryColor,
  getDefaultCountryOpacity,
} from '@/map/constants';

export const addCountriesFx = createEffect(
  ({ map, paintData, countriesGeoJson, countryId }: AddCountries) => {
    if (!map || !countriesGeoJson) return;

    let hoveredCountryId = 0;

    map.addSource('countries', {
      type: 'geojson',
      data: countriesGeoJson,
    });

    map.addLayer(
      {
        id: 'countries',
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': getDefaultCountryColor(paintData),
          'fill-outline-color': paintData.background,
          'fill-opacity': [
            'case',
            ['==', ['id'], countryId],
            0,
            getDefaultCountryOpacity(paintData),
          ],
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
        'line-width': 2,
      },
    });

    map.on('click', 'countries', (event: MapLayerMouseEvent) => {
      if (!event.features?.[0]) return;
      const selectedCountryId = event.features[0].id;
      const countryGeoJson = countriesGeoJson.features.find(
        (geoJson) => geoJson.id === selectedCountryId
      );
      if (countryGeoJson?.properties?.code) {
        const code = String(countryGeoJson.properties.code);
        mapCountry.navigate({ code: code.toLowerCase() });
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
  }
);
