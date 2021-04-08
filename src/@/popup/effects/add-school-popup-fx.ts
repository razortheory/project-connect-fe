import { createEffect } from 'effector';
import { Point } from 'geojson';

import { AddSchoolPopup } from '@/popup/types';

const nextTick = async () => new Promise((resolve) => setTimeout(resolve, 0));

export const addSchoolPopupFx = createEffect(
  async ({ map, popup, feature }: AddSchoolPopup) => {
    if (!map || !popup) return;

    const point = feature.geometry as Point;
    const coordinates = [...point.coordinates];

    // Close popup
    popup.remove();

    // Fix bug when popup closes and new one doesn't open
    await nextTick();

    // Open new popup
    popup.setLngLat([coordinates[0], coordinates[1]]).addTo(map);
  }
);
