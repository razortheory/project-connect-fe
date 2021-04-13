import { combine, forward, guard, merge, sample } from 'effector';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchCountryDailyStatsFx,
  fetchCountryFx,
  fetchCountryWeeklyStatsFx,
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
import { $map, $mapType, $stylePaintData, changeMapType } from '@/map/model';
import { $popup, $schoolId } from '@/popup/model';
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
  $schools,
  $schoolsGlobal,
  $zoomedCountryCode,
  changeCountryCode,
} from './model';

$countries.on(fetchCountriesFx.doneData, setPayload);
$countriesGeometry.on(fetchCountriesGeometryFx.doneData, setPayload);
$schoolsGlobal.on(fetchSchoolsGlobal.doneData, setPayload);
$country.on(fetchCountryFx.doneData, setPayload);
$countryCode.on(changeCountryCode, setPayload);
$schools.on(fetchSchoolsFx.doneData, setPayload);
$countryDailyStats.on(fetchCountryDailyStatsFx.doneData, setPayload);
$countryWeeklyStats.on(fetchCountryWeeklyStatsFx.doneData, setPayload);

$country.reset(changeCountryCode, fetchCountryFx.fail);
$schools.reset(changeCountryCode, fetchSchoolsFx.fail);

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

export const $mapContext = combine({
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
  source: guard({
    source: combine([$countryCode, mapCountry.params]),
    filter: ([countryCode, params]) => countryCode !== params?.code,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fn: ([_, params]) => params?.code ?? '',
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
  clock: merge([countryReceived, $map]),
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
  source: $mapContext,
  clock: merge([schoolsReceived, $map]),
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
