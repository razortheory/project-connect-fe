import { createEffect } from 'effector';
import { Point } from 'geojson';

import { UpdateSchoolPopup } from '@/map/@/country/types';

export const updateSchoolPopupFx = createEffect(
  ({ map, popup, event, popupContent }: UpdateSchoolPopup) => {
    if (!map || !popup || popup.isOpen()) return;

    const feature = map.queryRenderedFeatures(event.point)[0];
    const point = feature.geometry as Point;
    const coordinates = [...point.coordinates];

    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup
      .setLngLat([coordinates[0], coordinates[1]])
      .setDOMContent(popupContent)
      .addTo(map);
  }
);
