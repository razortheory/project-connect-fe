import { defaultCenter, defaultZoom } from '~/features/map/constants';

import { leaveCountryRouteFx, removeCountryFx, removeSchoolsFx } from './model';

leaveCountryRouteFx.use(async ({ map, paintData }) => {
  if (!map) return;

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

  map.setPaintProperty('countries', 'fill-outline-color', paintData.background);

  await Promise.all([removeSchoolsFx(map), removeCountryFx(map)]);
});
