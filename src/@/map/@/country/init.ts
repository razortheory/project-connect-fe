import { combine, forward, guard, merge, sample } from 'effector';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchCountryFx,
  fetchCountryStatistics,
  fetchSchoolFx,
  fetchSchoolsFx,
} from '~/api/project-connect';
import { mapCountry } from '~/core/routes';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { getCountriesGeoJson } from '@/map/@/country/lib';
import { $week, nextWeek, previousWeek } from '@/map/@/sidebar/model';
import {
  $map,
  $mapType,
  $stylePaintData,
  changeMap,
  changeMapType,
} from '@/map/model';

import {
  addCountriesFx,
  leaveCountryRouteFx,
  updateCountryFx,
  updateSchoolsColorsFx,
  updateSchoolsFx,
  zoomToCountryFx,
} from './effects';
import { addSchoolPopupFx } from './effects/add-school-popup-fx';
import {
  $countries,
  $countriesGeoJson,
  $countriesGeometry,
  $country,
  $countryCode,
  $countryId,
  $countryStatistics,
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
$countryStatistics.on(fetchCountryStatistics.doneData, setPayload);

$country.reset(changeCountryId, fetchCountryFx.fail);
$schools.reset(changeCountryId, fetchSchoolsFx.fail);
$school.reset(fetchSchoolFx.fail);
$countryStatistics.reset(
  changeCountryId,
  fetchCountryStatistics,
  nextWeek,
  previousWeek
);

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

sample({
  source: combine([$countryId, $week]),
  fn: ([countryId, week]) => ({ countryId, week }),
  target: fetchCountryStatistics,
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
  clock: merge([countryReceived, changeMap]),
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
  clock: merge([schoolsReceived, changeMap]),
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
  source: combine([mapCountry.params, $map]),
  fn: ([params]) => params?.code ?? '',
  target: $countryCode,
});

sample({
  source: $countries,
  clock: $countryCode,
  fn: (countries, code) => {
    if (!countries || !code) return 0;
    const country = countries.find((data) => isEqualText(data.code, code));
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
  fn: ({ map, paintData }) => ({ map, paintData }),
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

// Add popup
sample({
  source: $mapContext,
  clock: clickSchool,
  fn: ({ map, popup }, event) => ({ map, popup, event }),
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
