import { createEffect } from 'effector';

// eslint-disable-next-line no-restricted-imports
import { addCountriesLayer } from '@/country/effects/add-countries-layer';
// eslint-disable-next-line no-restricted-imports
import { addGlobalSchoolsLayer } from '@/country/effects/add-global-schools-layer';
import { LeaveCountryRoute } from '@/country/types';
import { defaultCenter, defaultZoom } from '@/map/constants';

import { removeCountryFx } from './remove-country-fx';
import { removeSchoolsFx } from './remove-schools-fx';

export const leaveCountryRouteFx = createEffect(
  async ({ map, paintData, popup }: LeaveCountryRoute) => {
    if (!map) return;

    popup?.remove();

    map.flyTo({
      center: defaultCenter,
      zoom: defaultZoom,
    });

    addGlobalSchoolsLayer({ map, paintData });
    addCountriesLayer({ map, paintData });

    await Promise.all([
      removeSchoolsFx(map),
      removeCountryFx({ map, paintData }),
    ]);
  }
);
