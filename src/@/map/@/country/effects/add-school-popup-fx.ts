import { createEffect } from 'effector';
import { Point } from 'geojson';

import { AddSchoolPopup } from '@/map/@/country/types';

export const addSchoolPopupFx = createEffect(
  ({ map, popup, event }: AddSchoolPopup) => {
    if (!map || !popup) return;

    const feature = map.queryRenderedFeatures(event.point)[0];
    const point = feature.geometry as Point;
    const coordinates = [...point.coordinates];

    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup.remove();

    // TODO: Fix bug when popup closes and new one doesn't open
    setTimeout(() => {
      popup.setLngLat([coordinates[0], coordinates[1]]).addTo(map);
    });
  }
);
