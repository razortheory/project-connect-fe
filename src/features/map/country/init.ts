import './update-country';
import './update-schools';
import './remove-country';
import './remove-schools';
import './leave-country-route';
import './add-countries';

import { combine, forward, guard, sample } from 'effector';

import { mapCountry } from '~/core/routes';
import {
  fetchCountriesData,
  fetchCountriesGeometryData,
} from '~/features/map/api';
import { combineCountriesDataToGeoJson } from '~/features/map/map-data-helpers';
import { $map, $stylePaintData, changeMap } from '~/features/map/model';
import { getInverted, setPayload } from '~/lib/effector-kit';

import {
  $countriesData,
  $countriesGeoJson,
  $countriesGeometryData,
  $selectedCountryId,
  addCountriesFx,
  changeCountryId,
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
  leaveCountryRouteFx,
  updateCountryFx,
  updateSchoolsFx,
} from './model';

fetchCountriesDataFx.use(fetchCountriesData);
fetchCountriesGeometryDataFx.use(fetchCountriesGeometryData);

$countriesData.on(fetchCountriesDataFx.doneData, setPayload);
$countriesGeometryData.on(fetchCountriesGeometryDataFx.doneData, setPayload);
$selectedCountryId.on(changeCountryId, setPayload);

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

// Routing
sample({
  source: guard(mapCountry.params, { filter: Boolean }),
  fn: (params) => Number(params?.id),
  target: changeCountryId,
});

sample({
  source: mapCountry.params,
  clock: changeMap,
  fn: (params) => (params?.id ? Number(params.id) : 0),
  target: changeCountryId,
});

// Leave country route
sample({
  source: $changeCountryData,
  clock: guard(mapCountry.visible, {
    filter: getInverted,
  }),
  target: leaveCountryRouteFx,
});

const allCountriesDataLoaded = guard({
  source: combine([$countriesData, $countriesGeometryData]),
  filter: ([countriesData, countriesGeometryData]) =>
    Boolean(countriesData && countriesGeometryData),
});

$countriesGeoJson.on(
  allCountriesDataLoaded,
  (_, [countriesData, countriesGeometryData]) =>
    combineCountriesDataToGeoJson(countriesData, countriesGeometryData)
);

// Add countries
const onCountriesGeoJson = sample($countriesGeoJson, allCountriesDataLoaded);

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
