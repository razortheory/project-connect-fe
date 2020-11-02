import { createEffect } from 'effector';

import { clickSchool } from '@/country/model';
import { UpdateSchools } from '@/country/types';
import { mapCircleSizes } from '@/map/constants';

import { getSchoolsColors } from './get-schools-colors';

export const updateSchoolsFx = createEffect(
  ({
    map,
    schools,
    mapType,
    hasConnectivityStatus,
    hasCoverageType,
  }: UpdateSchools) => {
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
            stops: mapCircleSizes,
          },
          'circle-color': getSchoolsColors({
            mapType,
            hasConnectivityStatus,
            hasCoverageType,
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
