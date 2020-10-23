import { createEffect } from 'effector';

import { UpdateSchoolsColors } from '@/country/types';

import { getSchoolsColors } from './get-schools-colors';

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
