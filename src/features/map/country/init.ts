import './update-country';
import './update-schools';
import './zoom-to-country-bounds';
import './remove-country';
import './remove-schools';
import './leave-country-route';
import './add-countries';

import { combine, forward, guard, merge, sample } from 'effector';

import { mapCountry } from '~/core/routes';
import {
  fetchCountriesData,
  fetchCountriesGeometryData,
  fetchCountryData,
  fetchCountrySchools,
} from '~/features/map/api';
import { combineCountriesDataToGeoJson } from '~/features/map/map-data-helpers';
import { $map, $stylePaintData, changeMap } from '~/features/map/model';
import { getInverted, setPayload } from '~/lib/effector-kit';

import {
  $countriesData,
  $countriesGeoJson,
  $countriesGeometryData,
  $countryData,
  $countrySchools,
  $selectedCountryId,
  addCountriesFx,
  changeCountryId,
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
  fetchCountryDataFx,
  fetchCountrySchoolsFx,
  leaveCountryRouteFx,
  updateCountryFx,
  updateSchoolsFx,
  zoomToCountryBoundsFx,
} from './model';

fetchCountriesDataFx.use(fetchCountriesData);
fetchCountriesGeometryDataFx.use(fetchCountriesGeometryData);
fetchCountrySchoolsFx.use(fetchCountrySchools);
fetchCountryDataFx.use(fetchCountryData);

$countriesData.on(fetchCountriesDataFx.doneData, setPayload);
$countriesGeometryData.on(fetchCountriesGeometryDataFx.doneData, setPayload);
$countrySchools.on(fetchCountrySchoolsFx.doneData, setPayload);
$countryData.on(fetchCountryDataFx.doneData, setPayload);
$selectedCountryId.on(changeCountryId, setPayload);

const $mapScope = combine({
  map: $map,
  countriesGeometry: $countriesGeometryData,
  paintData: $stylePaintData,
  countryData: $countryData,
  countrySchools: $countrySchools,
});

// Zoom to country bounds
sample({
  source: $mapScope,
  clock: changeCountryId,
  fn: ({ map, countriesGeometry }, countryId) => ({
    map,
    countriesGeometry,
    countryId,
  }),
  target: zoomToCountryBoundsFx,
});

// Trigger fetch country data and schools data
forward({
  from: guard(changeCountryId, { filter: Boolean }),
  to: [fetchCountrySchoolsFx, fetchCountryDataFx],
});

// Check received countryData for relevance
const countryDataReceived = guard({
  source: sample({
    source: $selectedCountryId,
    clock: fetchCountryDataFx.done,
    fn: (countryId, { params }) => ({
      countryId,
      doneCountryId: params,
    }),
  }),
  filter: ({ countryId, doneCountryId }) => countryId === doneCountryId,
});

sample({
  source: $mapScope,
  clock: countryDataReceived,
  fn: ({ map, paintData, countryData }) => ({
    map,
    paintData,
    countryData,
  }),
  target: updateCountryFx,
});

const schoolsReceived = guard({
  source: sample({
    source: $selectedCountryId,
    clock: fetchCountrySchoolsFx.done,
    fn: (countryId, { params }) => ({
      countryId,
      params,
    }),
  }),
  filter: ({ countryId, params }) => countryId === params,
});

sample({
  source: $mapScope,
  clock: schoolsReceived,
  fn: ({ map, countrySchools }) => ({
    map,
    countrySchools,
  }),
  target: updateSchoolsFx,
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
  source: $mapScope,
  clock: guard(mapCountry.visible, {
    filter: getInverted,
  }),
  fn: ({ map, paintData }) => ({ map, paintData }),
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
const onCountriesGeoJson = sample({
  source: $countriesGeoJson,
  clock: merge([changeMap, allCountriesDataLoaded]),
});

sample({
  source: $mapScope,
  clock: guard(onCountriesGeoJson, { filter: Boolean }),
  fn: ({ map, paintData }, countriesGeoJson) => ({
    map,
    paintData,
    countriesGeoJson,
  }),
  target: addCountriesFx,
});
