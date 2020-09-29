import { combine, forward, guard, merge, sample } from 'effector';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchCountryFx,
  fetchSchoolFx,
  fetchSchoolsFx,
} from '~/api/project-connect';
import { mapCountry } from '~/core/routes';
import { getInverted, getVoid, setPayload } from '~/lib/effector-kit';

import { getCountriesGeoJson } from '@/map/@/country/lib';
import { initMapFx } from '@/map/effects';
import {
  $map,
  $mapType,
  $stylePaintData,
  changeMap,
  changeMapType,
} from '@/map/model';

import {
  addCountriesFx,
  addSchoolPopupFx,
  createSchoolPopupFx,
  leaveCountryRouteFx,
  updateCountryFx,
  updateSchoolsColorsFx,
  updateSchoolsFx,
  zoomToCountryFx,
} from './effects';
import {
  $countries,
  $countriesGeoJson,
  $countriesGeometry,
  $country,
  $countryId,
  $popup,
  $school,
  $schoolId,
  $schools,
  changeCountryId,
  changeSchoolId,
  clickSchool,
} from './model';

$countries.on(fetchCountriesFx.doneData, setPayload);
$countriesGeometry.on(fetchCountriesGeometryFx.doneData, setPayload);
$country.on(fetchCountryFx.doneData, setPayload);
$countryId.on(changeCountryId, setPayload);
$schools.on(fetchSchoolsFx.doneData, setPayload);
$school.on(fetchSchoolFx.doneData, setPayload);
$schoolId.on(changeSchoolId, setPayload);

$country.reset(changeCountryId, fetchCountryFx.fail);
$schools.reset(changeCountryId, fetchSchoolsFx.fail);
$school.reset(fetchSchoolFx.fail);

const $mapContext = combine({
  map: $map,
  mapType: $mapType,
  countriesGeometry: $countriesGeometry,
  paintData: $stylePaintData,
  country: $country,
  schools: $schools,
  popup: $popup,
  isCountryRoute: mapCountry.visible,
  countryId: $countryId,
  schoolId: $schoolId,
});

// Fetch country data and schools data
forward({
  from: guard(changeCountryId, { filter: Boolean }),
  to: [fetchSchoolsFx, fetchCountryFx],
});

// Zoom to country bounds
sample({
  source: $mapContext,
  fn: ({ map, countryId, countriesGeometry, country }) => ({
    map,
    countryId,
    countriesGeometry,
    country,
  }),
  target: zoomToCountryFx,
});

// Check received country for relevance
const countryReceived = guard({
  source: sample({
    source: $countryId,
    clock: fetchCountryFx.done,
    fn: (countryId, { params }) => ({
      countryId,
      doneCountryId: params,
    }),
  }),
  filter: ({ countryId, doneCountryId }) => countryId === doneCountryId,
});

// Update country
sample({
  source: $mapContext,
  clock: countryReceived,
  fn: ({ map, paintData, country }) => ({
    map,
    paintData,
    country,
  }),
  target: updateCountryFx,
});

// Check received schools for relevance
const schoolsReceived = guard({
  source: sample({
    source: $countryId,
    clock: fetchSchoolsFx.done,
    fn: (countryId, { params }) => ({
      countryId,
      params,
    }),
  }),
  filter: ({ countryId, params }) => countryId === params,
});

sample({
  source: $mapContext,
  clock: schoolsReceived,
  fn: ({ map, schools, mapType }) => ({
    map,
    schools,
    mapType,
  }),
  target: updateSchoolsFx,
});

// Routing
const isEqualText = (a: string, b: string) =>
  a.toLocaleLowerCase() === b.toLocaleLowerCase();

sample({
  source: $countries,
  clock: combine([mapCountry.params, $map]),
  fn: (countries, [routeParams]) => {
    if (!countries || !routeParams) return 0;
    const country = countries.find((data) =>
      isEqualText(data.code, routeParams.code)
    );
    return country?.id ?? 0;
  },
  target: changeCountryId,
});

// Leave country route
sample({
  source: $mapContext,
  clock: guard(mapCountry.visible, {
    filter: getInverted,
  }),
  fn: ({ map, paintData, popup }) => ({ map, paintData, popup }),
  target: leaveCountryRouteFx,
});

const onCountriesAndGeometry = guard({
  source: combine([$countries, $countriesGeometry]),
  filter: ([countries, countriesGeometry]) =>
    Boolean(countries && countriesGeometry),
});

$countriesGeoJson.on(
  onCountriesAndGeometry,
  (_, [countries, countriesGeometry]) =>
    getCountriesGeoJson(countries, countriesGeometry)
);

// Add countries
const onCountriesGeoJson = sample({
  source: $countriesGeoJson,
  clock: merge([changeMap, onCountriesAndGeometry]),
});

sample({
  source: $mapContext,
  clock: guard(onCountriesGeoJson, { filter: Boolean }),
  fn: ({ map, paintData, isCountryRoute }, countriesGeoJson) => ({
    map,
    paintData,
    countriesGeoJson,
    isCountryRoute,
  }),
  target: addCountriesFx,
});

// Create school popup
sample({
  source: initMapFx.done,
  fn: getVoid,
  target: createSchoolPopupFx,
});

sample({
  source: createSchoolPopupFx.doneData,
  target: $popup,
});

// Add school popup
sample({
  source: $mapContext,
  clock: clickSchool,
  fn: ({ map, popup }, event) => ({
    map,
    popup,
    event,
  }),
  target: addSchoolPopupFx,
});

// Update school id
sample({
  source: clickSchool,
  fn: (event) => {
    const feature = event?.features?.[0];
    return (feature?.id as number) ?? 0;
  },
  target: changeSchoolId,
});

// Fetch school data
sample({
  source: $mapContext,
  clock: $schoolId,
  fn: ({ countryId, schoolId }) => ({ countryId, schoolId }),
  target: fetchSchoolFx,
});

// Change map type
sample({
  source: $map,
  clock: changeMapType,
  fn: (map, mapType) => ({ map, mapType }),
  target: updateSchoolsColorsFx,
});
