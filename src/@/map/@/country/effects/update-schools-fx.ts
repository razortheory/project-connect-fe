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
              [7, 2],
              [8, 2],
              [9, 2],
              [10, 2],
              [11, 2],
              [12, 3],
              [13, 3],
              [14, 3],
              [15, 3],
              [16, 3],
              [17, 3],
              [18, 4],
              [19, 4],
              [20, 4],
              [21, 4],
              [22, 4],
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
