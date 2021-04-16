import { createEffect } from 'effector';
import { Point } from 'geojson';
import { PointLike } from 'mapbox-gl';

import { changeSchoolId } from '@/country/model';
import { AddSchoolPopup } from '@/popup/types';

const nextTick = async () => new Promise((resolve) => setTimeout(resolve, 0));

export const addSchoolPopupFx = createEffect(
  async ({ map, popup, event, isMobile }: AddSchoolPopup) => {
    if (!map || !popup) return;

    const clickAreaSize: number = isMobile ? 10 : 2;

    const bbox: [PointLike, PointLike] = [
      [event.point.x - clickAreaSize, event.point.y - clickAreaSize],
      [event.point.x + clickAreaSize, event.point.y + clickAreaSize],
    ];

    const features = map.queryRenderedFeatures(bbox, {
      layers: ['schools'],
    });

    if (!features?.length) {
      return;
    }

    changeSchoolId(Number(features[0]?.id) ?? 0);

    const point = features[0].geometry as Point;
    const coordinates = [...point.coordinates];

    // Close popup
    popup.remove();

    // Fix bug when popup closes and new one doesn't open
    await nextTick();

    // Open new popup
    popup.setLngLat([coordinates[0], coordinates[1]]).addTo(map);
  }
);
