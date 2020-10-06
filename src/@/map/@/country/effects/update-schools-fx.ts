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
              [5, 2],
              [6, 4],
              [7, 6],
              [8, 8],
              [9, 10],
              [10, 12],
              [11, 14],
              [12, 16],
              [13, 18],
              [14, 20],
              [15, 22],
              [16, 24],
              [17, 26],
              [18, 28],
              [19, 30],
              [20, 32],
              [21, 34],
              [22, 36],
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
