import { createEffect } from 'effector';

import { clickSchool } from '@/country/model';
import { UpdateSchools } from '@/country/types';
import { mapCircleSizes } from '@/map/constants';
import { LS_DOTS_KEY } from '@/setDotsSize/dots-popup';

import { getSchoolsColors } from './get-schools-colors';

export const updateSchoolsFx = createEffect(
  ({ map, schools, mapType, paintData }: UpdateSchools) => {
    if (!map || !schools) return;

    const lsSizes: string | null = localStorage.getItem(LS_DOTS_KEY);
    let sizes: number[][] | null = lsSizes
      ? (JSON.parse(lsSizes) as number[][])
      : null;

    if (!sizes) {
      sizes = mapCircleSizes;
      localStorage.setItem(LS_DOTS_KEY, JSON.stringify(sizes));
    }

    if (schools.features.length > 0) {
      map.addSource('schools', {
        type: 'geojson',
        data: schools,
      });

      map.addLayer({
        id: 'schools',
        type: 'circle',
        source: 'schools',
        paint: {
          'circle-radius': {
            stops: sizes,
          },
          'circle-color': getSchoolsColors({
            mapType,
            paintData,
          }),
        },
      });

      map.on('mouseenter', 'schools', () => {
        // eslint-disable-next-line no-param-reassign
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'schools', () => {
        // eslint-disable-next-line no-param-reassign
        map.getCanvas().style.cursor = '';
      });

      map.on('click', 'schools', clickSchool);
    }
  }
);
