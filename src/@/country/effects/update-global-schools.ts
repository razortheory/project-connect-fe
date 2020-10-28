import { createEffect } from 'effector';

import { UpdateGlobalSchools } from '@/country/types';

export const updateGlobalSchools = createEffect(
  ({ map, paintData, schoolsGlobal }: UpdateGlobalSchools) => {
    if (!map || !schoolsGlobal) return;

    map.addSource('schoolsGlobal', {
      type: 'geojson',
      data: schoolsGlobal,
    });

    map.addLayer(
      {
        id: 'schoolsGlobal',
        type: 'circle',
        source: 'schoolsGlobal',
        paint: {
          'circle-radius': {
            stops: [
              [1, 0.5],
              [2, 0.5],
              [3, 0.5],
              [4, 1],
              [12, 2],
            ],
          },
          'circle-color': [
            'match',
            ['get', 'country_integration_status'],
            0,
            paintData.schoolsNotVerified,
            1,
            paintData.schoolsVerified,
            2,
            paintData.schoolsWithConnectivity,
            3,
            paintData.schoolsWithConnectivity,
            paintData.schoolsNotVerified,
          ],
        },
      },
      map.getLayer('selectedCountry') ? 'selectedCountry' : ''
    );
  }
);
