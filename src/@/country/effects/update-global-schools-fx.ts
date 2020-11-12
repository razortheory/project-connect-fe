import { createEffect } from 'effector';

// eslint-disable-next-line no-restricted-imports
import { addGlobalSchoolsLayer } from '@/country/effects/add-global-schools-layer';
import { UpdateGlobalSchools } from '@/country/types';

export const updateGlobalSchoolsFx = createEffect(
  ({ map, paintData, schoolsGlobal, countryId }: UpdateGlobalSchools) => {
    if (!map || !schoolsGlobal) return;

    map.addSource('schoolsGlobal', {
      type: 'geojson',
      data: schoolsGlobal,
    });

    if (!countryId) {
      addGlobalSchoolsLayer({ map, paintData });
    }
  }
);
