import './update-country';
import './update-schools';
import './remove-country';
import './remove-schools';
import './leave-country-route';
import './add-countries';

import { combine, forward, guard, sample } from 'effector';

import { mapCountry } from '~/core/routes';
import {
  $countriesData,
  $countriesGeoJson,
  $countriesGeometryData,
  $map,
  $stylePaintData,
  changeCountryId,
} from '~/features/map/model';
import { getInverted } from '~/lib/effector-kit';

import {
  addCountriesFx,
  leaveCountryRouteFx,
  updateCountryFx,
  updateSchoolsFx,
} from './model';

const $changeCountryData = combine({
  map: $map,
  paintData: $stylePaintData,
});

// Change country
forward({
  from: sample({
    source: $changeCountryData,
    clock: changeCountryId,
    fn: ({ map, paintData }, countryId) => ({ map, paintData, countryId }),
  }),
  to: [updateCountryFx, updateSchoolsFx],
});

// Leave country route
sample({
  source: $changeCountryData,
  clock: guard(mapCountry.visible, {
    filter: getInverted,
  }),
  target: leaveCountryRouteFx,
});

// Add countries
const onCountriesGeoJson = sample({
  source: $countriesGeoJson,
  clock: guard({
    source: combine([$countriesData, $countriesGeometryData]),
    filter: ([countriesData, countriesGeometryData]) =>
      Boolean(countriesData && countriesGeometryData),
  }),
});

sample({
  source: $changeCountryData,
  clock: guard(onCountriesGeoJson, { filter: Boolean }),
  fn: ({ map, paintData }, countriesGeoJson) => ({
    map,
    paintData,
    countriesGeoJson,
  }),
  target: addCountriesFx,
});
