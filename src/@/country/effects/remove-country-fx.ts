import { createEffect } from 'effector';
import { PointLike } from 'mapbox-gl';

import { clickSchool } from '@/country/model';
import { getDefaultCountryOpacity } from '@/map/constants';
import { Map, StylePaintData } from '@/map/types';

export const removeCountryFx = createEffect(
  ({ map, paintData }: { map: Map | null; paintData: StylePaintData }) => {
    if (!map) return;

    map.off('click', 'selectedCountry', (event) => {
      const bbox: [PointLike, PointLike] = [
        [event.point.x - 10, event.point.y - 10],
        [event.point.x + 10, event.point.y + 10],
      ];

      const features = map.queryRenderedFeatures(bbox, {
        layers: ['schools'],
      });

      if (!features?.length) {
        return;
      }

      clickSchool(features[0]);
    });

    if (map.getLayer('selectedCountry')) {
      map.removeLayer('selectedCountry');
    }

    if (map.getSource('selectedCountry')) {
      map.removeSource('selectedCountry');
    }
    if (map.getLayer('countries')) {
      map.setPaintProperty(
        'countries',
        'fill-opacity',
        getDefaultCountryOpacity(paintData)
      );
    }
  }
);
