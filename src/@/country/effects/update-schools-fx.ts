import { createEffect } from 'effector';

import { clickSchool } from '@/country/model';
import { UpdateSchools } from '@/country/types';

import { getSchoolsColors } from './get-schools-colors';

export const updateSchoolsFx = createEffect(
  ({ map, schools, mapType }: UpdateSchools) => {
    if (!map || !schools) return;

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
              [11, 3],
              [12, 3],
              [13, 5],
              [14, 5],
              [15, 5],
              [16, 5],
              [17, 5],
              [18, 8],
              [19, 8],
              [20, 8],
              [21, 8],
              [22, 8],
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
