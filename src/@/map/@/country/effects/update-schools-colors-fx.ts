import { createEffect } from 'effector';

import { getSchoolsColors } from '@/map/@/country/helpers';
import { UpdateSchoolsColors } from '@/map/@/country/types';

export const updateSchoolsColorsFx = createEffect(
  ({ map, mapType }: UpdateSchoolsColors) => {
    if (!map) return;

    if (map.getLayer('schools')) {
      map.setPaintProperty(
        'schools',
        'circle-color',
        getSchoolsColors(mapType)
      );
    }
  }
);
