import { createEffect } from 'effector';

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

    map.setPaintProperty('countries', 'fill-color', [
      'match',
      ['get', 'integration_status'],
      0,
      paintData.countryNotVerified,
      1,
      paintData.countryVerified,
      2,
      paintData.countryWithConnectivity,
      3,
      paintData.countryWithConnectivity,
      paintData.countryNotVerified,
    ]);

    map.setPaintProperty(
      'countries',
      'fill-outline-color',
      paintData.background
    );

    await Promise.all([removeSchoolsFx(map), removeCountryFx(map)]);
  }
);
