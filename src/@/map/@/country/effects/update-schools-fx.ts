import { createEffect } from 'effector';

import { clickSchool } from '@/map/@/country/model';
import { UpdateSchools } from '@/map/@/country/types';

import { getSchoolsColors } from './get-schools-colors';
import { removeSchoolsFx } from './remove-schools-fx';

export const updateSchoolsFx = createEffect(
  async ({ map, schools, mapType }: UpdateSchools) => {
    if (!map || !schools) return;

    await removeSchoolsFx(map);

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
            stops: [
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
              [5, 1],
              [6, 2],
              [7, 3],
              [8, 4],
              [9, 5],
              [10, 8],
              [11, 10],
              [12, 12],
              [13, 14],
              [14, 16],
              [15, 18],
              [16, 20],
              [17, 22],
              [18, 24],
              [19, 26],
              [20, 28],
              [21, 30],
              [22, 32],
            ],
          },
          'circle-color': getSchoolsColors(mapType),
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
