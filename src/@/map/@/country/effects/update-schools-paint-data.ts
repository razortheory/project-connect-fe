import { createEffect } from 'effector';

import { UpdateSchoolsPaintData } from '@/map/@/country/types';

import { getSchoolsCircleColor } from './update-schools-fx';

export const updateSchoolsPaintDataFx = createEffect(
  ({ map, mapType }: UpdateSchoolsPaintData) => {
    if (!map) return;

    if (map.getLayer('schools')) {
      map.setPaintProperty(
        'schools',
        'circle-color',
        getSchoolsCircleColor(mapType)
      );
    }
  }
);
