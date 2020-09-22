import { combine, forward, guard, merge, sample } from 'effector';

import {
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
  fetchCountryDataFx,
  fetchCountrySchoolsFx,
} from '~/api/project-connect';
import { mapCountry } from '~/core/routes';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { getCountriesGeoJson } from '@/map/lib/get-countries-geo-json';
import { $map, $stylePaintData, changeMap } from '@/map/model';

import {
  addCountriesFx,
  leaveCountryRouteFx,
  updateCountryFx,
  updateSchoolsFx,
  zoomToCountryFx,
} from './effects';
import { addSchoolPopupFx } from './effects/add-school-popup-fx';
import {
  $countriesData,
  $countriesGeoJson,
  $countriesGeometryData,
  $countryData,
  $countrySchools,
  $popup,
  $popupContext,
  $selectedCountryId,
  changeCountryId,
  clickSchool,
  updatePopupContext,
} from './model';

$countriesData.on(fetchCountriesDataFx.doneData, setPayload);
$countriesGeometryData.on(fetchCountriesGeometryDataFx.doneData, setPayload);
$countrySchools.on(fetchCountrySchoolsFx.doneData, setPayload);
$countryData.on(fetchCountryDataFx.doneData, setPayload);
$selectedCountryId.on(changeCountryId, setPayload);
$popupContext.on(updatePopupContext, setPayload);

const $mapScope = combine({
  map: $map,
  countriesGeometry: $countriesGeometryData,
  paintData: $stylePaintData,
  countryData: $countryData,
  countrySchools: $countrySchools,
  popup: $popup,
  isCountryRoute: mapCountry.visible,
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
  target: zoomToCountryFx,
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
    getCountriesGeoJson(countriesData, countriesGeometryData)
);

// Add countries
const onCountriesGeoJson = sample({
  source: $countriesGeoJson,
  clock: merge([changeMap, allCountriesDataLoaded]),
});

sample({
  source: $mapScope,
  clock: guard(onCountriesGeoJson, { filter: Boolean }),
  fn: ({ map, paintData, isCountryRoute }, countriesGeoJson) => ({
    map,
    paintData,
    countriesGeoJson,
    isCountryRoute,
  }),
  target: addCountriesFx,
});

// Add popup
sample({
  source: $mapScope,
  clock: clickSchool,
  fn: ({ map, popup }, event) => ({ map, popup, event }),
  target: addSchoolPopupFx,
});
