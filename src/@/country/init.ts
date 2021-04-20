import { combine, forward, guard, merge, sample } from 'effector';

import {
  checkSchoolHasHistory,
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchCountryDailyStatsFx,
  fetchCountryFx,
  fetchCountryWeeklyStatsFx,
  fetchSchoolDailyStatsFx,
  fetchSchoolFx,
  fetchSchoolsFx,
  fetchSchoolsGlobal,
} from '~/api/project-connect';
import { $isMobile } from '~/core/media-query';
import { mapCountry } from '~/core/routes';
import { getInverted, setPayload } from '~/lib/effector-kit';

import {
  addCountriesFx,
  leaveCountryRouteFx,
  removeCountryFx,
  removeSchoolsFx,
  updateCountryFx,
  updateGlobalSchoolsFx,
  updateSchoolsColorsFx,
  updateSchoolsFx,
  zoomToCountryFx,
} from '@/country/effects';
import { getCountriesGeoJson } from '@/country/lib';
import {
  $map,
  $mapType,
  $stylePaintData,
  changeMapType,
  onStyleLoaded,
} from '@/map/model';
import { addSchoolPopupFx } from '@/popup/effects';
import { $isOpenPopup, $popup } from '@/popup/model';
import { $week, nextWeek, previousWeek } from '@/sidebar/model';

import {
  $countries,
  $countriesGeoJson,
  $countriesGeometry,
  $country,
  $countryCode,
  $countryDailyStats,
  $countryHasConnectivity,
  $countryHasCoverage,
  $countryInfoPending,
  $countryWeeklyStats,
  $school,
  $schoolDailyStats,
  $schoolHasHistory,
  $schoolId,
  $schools,
  $schoolsGlobal,
  $zoomedCountryCode,
  changeCountryCode,
  changeSchoolId,
  clickSchool,
} from './model';

$countries.on(fetchCountriesFx.doneData, setPayload);
$countriesGeometry.on(fetchCountriesGeometryFx.doneData, setPayload);
$schoolsGlobal.on(fetchSchoolsGlobal.doneData, setPayload);
$country.on(fetchCountryFx.doneData, setPayload);
$countryCode.on(changeCountryCode, setPayload);
$schools.on(fetchSchoolsFx.doneData, setPayload);

$school.on(fetchSchoolFx.doneData, setPayload);
$schoolId.on(changeSchoolId, setPayload);
$countryWeeklyStats.on(fetchCountryWeeklyStatsFx.doneData, setPayload);
$countryDailyStats.on(fetchCountryDailyStatsFx.doneData, setPayload);
$schoolDailyStats.on(fetchSchoolDailyStatsFx.doneData, setPayload);
$schoolHasHistory.on(checkSchoolHasHistory.doneData, (_, payload) =>
  Boolean(payload?.length)
);

$country.reset(changeCountryCode, fetchCountryFx.fail);
$schools.reset(changeCountryCode, fetchSchoolsFx.fail);
$school.reset(fetchSchoolFx.fail);
$schoolHasHistory.reset(changeSchoolId);

sample({
  source: guard($country, { filter: Boolean }),
  fn: (country) =>
    country.statistics.connectivity_availability !== 'no_connectivity',
  target: $countryHasConnectivity,
});

$countryHasConnectivity.reset(changeCountryCode, leaveCountryRouteFx.done);

sample({
  source: guard($country, { filter: Boolean }),
  fn: (country) => country.statistics.coverage_availability !== 'no_coverage',
  target: $countryHasCoverage,
});

$countryHasCoverage.reset(changeCountryCode, leaveCountryRouteFx.done);

sample({
  source: combine([$countryHasConnectivity, $countryHasCoverage]),
  fn: ([countryHasConnectivity, countryHasCoverage]) => {
    if (!countryHasConnectivity && countryHasCoverage) {
      return 'coverage';
    }
    return 'connectivity';
  },
  target: changeMapType,
});

const onClosePopup = guard($isOpenPopup, { filter: getInverted });
$schoolId.reset(onClosePopup);

$countryWeeklyStats.reset(
  changeCountryCode,
  fetchCountryWeeklyStatsFx,
  nextWeek,
  previousWeek
);

$countryDailyStats.reset(
  changeCountryCode,
  fetchCountryDailyStatsFx,
  nextWeek,
  previousWeek
);

$schoolDailyStats.reset(
  changeSchoolId,
  fetchSchoolDailyStatsFx,
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
  countryCode: $countryCode,
  schoolId: $schoolId,
  zoomedCountryCode: $zoomedCountryCode,
  isMobile: $isMobile,
});

// Routing
sample({
  source: combine([mapCountry.params]),
  fn: ([params]) => params?.code ?? '',
  target: changeCountryCode,
});

// Fetch country data and schools data
forward({
  from: guard(changeCountryCode, { filter: Boolean }),
  to: [fetchSchoolsFx, fetchCountryFx],
});

guard({
  source: combine([$countryCode, $week], ([countryCode, week]) => ({
    countryCode,
    week,
  })),
  filter: ({ countryCode }) => Boolean(countryCode),
  target: fetchCountryWeeklyStatsFx,
});

guard({
  source: combine([$countryCode, $week], ([countryCode, interval]) => ({
    countryCode,
    interval,
  })),
  filter: ({ countryCode }) => Boolean(countryCode),
  target: fetchCountryDailyStatsFx,
});

sample({
  source: guard(combine([$schoolId, $week, $country]), {
    filter: ([schoolId, week, country]) =>
      Boolean(schoolId && country?.statistics.integration_status === 3 && week),
  }),
  fn: ([schoolId, week]) => ({
    schoolId,
    interval: week,
  }),
  target: fetchSchoolDailyStatsFx,
});

sample({
  source: guard(combine([$schoolId, $country]), {
    filter: ([schoolId, country]) =>
      Boolean(schoolId && country?.statistics.integration_status === 3),
  }),
  fn: ([schoolId, country]) => ({
    schoolId,
    interval: {
      start: new Date(country?.date_schools_mapped ?? '') as number | Date,
      end: new Date() as number | Date,
    },
  }),
  target: checkSchoolHasHistory,
});

// Zoom to country bounds
sample({
  source: guard($mapContext, {
    filter: ({ countryCode, zoomedCountryCode }) =>
      Boolean(countryCode && countryCode !== zoomedCountryCode),
  }),
  fn: ({ map, countryCode, countriesGeometry, country, isMobile }) => ({
    map,
    countryCode,
    countriesGeometry,
    country,
    isMobile,
  }),
  target: zoomToCountryFx,
});

$zoomedCountryCode.on(zoomToCountryFx.doneData, setPayload);
$zoomedCountryCode.reset(leaveCountryRouteFx.done);

// Check received country for relevance
const countryReceived = guard({
  source: sample({
    source: $countryCode,
    clock: fetchCountryFx.done,
    fn: (countryCode, { params }) => ({
      countryCode,
      doneCountryCode: params,
    }),
  }),
  filter: ({ countryCode, doneCountryCode }) => countryCode === doneCountryCode,
});

// Update country
sample({
  source: $mapContext,
  clock: merge([countryReceived, $map, onStyleLoaded]),
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
    source: $countryCode,
    clock: fetchSchoolsFx.done,
    fn: (countryCode, { params }) => ({
      countryCode,
      params,
    }),
  }),
  filter: ({ countryCode, params }) => countryCode === params,
});

sample({
  source: $mapContext,
  clock: combine([$schoolsGlobal, $map]),
  fn: ({ paintData, map, countryCode }, [schoolsGlobal]) => ({
    map,
    paintData,
    schoolsGlobal,
    countryCode,
  }),
  target: updateGlobalSchoolsFx,
});

sample({
  source: combine([$stylePaintData, $map, $countryCode, $schoolsGlobal]),
  clock: onStyleLoaded,
  fn: ([paintData, map, countryCode, schoolsGlobal]) => ({
    map,
    paintData,
    schoolsGlobal,
    countryCode,
  }),
  target: updateGlobalSchoolsFx,
});

sample({
  source: $mapContext,
  clock: merge([schoolsReceived, $map, onStyleLoaded]),
  fn: ({ map, schools, mapType, paintData }) => ({
    map,
    schools,
    mapType,
    paintData,
  }),
  target: updateSchoolsFx,
});

sample({
  source: $mapContext,
  clock: changeCountryCode,
  fn: ({ map, paintData }) => ({ map, paintData }),
  target: removeCountryFx,
});

sample({
  source: guard($map, { filter: Boolean }),
  clock: changeCountryCode,
  fn: (map) => map,
  target: removeSchoolsFx,
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
  clock: merge([onCountriesAndGeometry, $map]),
});

sample({
  source: $mapContext,
  clock: guard(onCountriesGeoJson, { filter: Boolean }),
  fn: ({ map, paintData, countryCode }, countriesGeoJson) => ({
    map,
    paintData,
    countriesGeoJson,
    countryCode,
  }),
  target: addCountriesFx,
});

sample({
  source: combine([$map, $stylePaintData, $countryCode, $countriesGeoJson]),
  clock: onStyleLoaded,
  fn: ([map, paintData, countryCode, countriesGeoJson]) => {
    return {
      map,
      paintData,
      countriesGeoJson,
      countryCode,
    };
  },
  target: addCountriesFx,
});

// Close an opened school popup on click by another school
sample({
  source: guard($schoolId, { filter: Boolean }),
  clock: clickSchool,
  fn: () => false,
  target: $isOpenPopup,
});

// Add school popup
sample({
  source: $mapContext,
  clock: clickSchool,
  fn: ({ map, popup, isMobile }, event) => ({
    map,
    popup,
    event,
    isMobile,
  }),
  target: addSchoolPopupFx,
});

// Fetch school data
sample({
  source: $mapContext,
  clock: guard($schoolId, { filter: Boolean }),
  fn: ({ countryCode, schoolId }) => ({ countryCode, schoolId }),
  target: fetchSchoolFx,
});

// Change map type
sample({
  source: $mapContext,
  clock: changeMapType,
  fn: ({ map, paintData }, mapType) => ({
    map,
    mapType,
    paintData,
  }),
  target: updateSchoolsColorsFx,
});

$countryInfoPending.on(fetchCountryWeeklyStatsFx.pending, setPayload);
