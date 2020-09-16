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

const $changeMapView = combine({
  map: $map,
  countriesGeometry: $countriesGeometryData,
});

// Zoom to country bounds
sample({
  source: $changeMapView,
  clock: changeCountryId,
  fn: ({ map, countriesGeometry }, countryId) => ({
    map,
    countryId,
    countriesGeometry,
  }),
  target: zoomToCountryBoundsFx,
});

// trigger fetch country data and schools data
forward({
  from: guard(changeCountryId, { filter: Boolean }),
  to: [fetchCountrySchoolsFx, fetchCountryDataFx],
});

// check for current country id and response country id
const onGetCountryData = guard({
  source: sample({
    source: $selectedCountryId,
    clock: fetchCountryDataFx.done,
    fn: (countryId, { params }) => ({
      countryId,
      params,
    }),
  }),
  filter: ({ countryId, params }) => countryId === params,
});

const $changeCountryData = combine({
  map: $map,
  paintData: $stylePaintData,
});

sample({
  source: combine([$changeCountryData, $countryData]),
  clock: onGetCountryData,
  fn: ([{ map, paintData }, countryData]) => ({
    map,
    paintData,
    countryData,
  }),
  target: updateCountryFx,
});

const onGetSchools = guard({
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
  source: combine([$map, $countrySchools]),
  clock: onGetSchools,
  fn: ([map, countrySchools]) => ({
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
const onCountriesGeoJson = sample({
  source: $countriesGeoJson,
  clock: merge([changeMap, allCountriesDataLoaded]),
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
