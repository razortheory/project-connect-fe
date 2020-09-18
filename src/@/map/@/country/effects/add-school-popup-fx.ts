import { createEffect } from 'effector';
import { Point } from 'geojson';
import mapboxGL from 'mapbox-gl';

import { updatePopupContext } from '@/map/@/country/model';
import { AddSchoolPopup } from '@/map/@/country/types';

export const addSchoolPopupFx = createEffect(
  ({ map, popup, event }: AddSchoolPopup) => {
    if (!map || !popup) return;

    const feature = map.queryRenderedFeatures(event.point)[0];
    const point = feature.geometry as Point;
    const coordinates = [...point.coordinates];
    const description = (feature.properties?.name as string) ?? 'No data';

    updatePopupContext({ description });

    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxGL.Popup({ maxWidth: '100%', className: 'country-popup' })
      .setLngLat([coordinates[0], coordinates[1]])
      .setDOMContent(popup)
      .addTo(map);
  }
);
