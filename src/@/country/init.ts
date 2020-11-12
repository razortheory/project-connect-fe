import { combine, forward, guard, merge, sample } from 'effector';

import {
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
import { $map, $mapType, $stylePaintData, changeMapType } from '@/map/model';
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
  $countryId,
  $countryInfoPending,
  $countryWeeklyStats,
  $hasConnectivity,
  $hasConnectivityStatus,
  $hasCoverageAvailability,
  $hasCoverageType,
  $school,
  $schoolDailyStats,
  $schoolId,
  $schools,
  $schoolsGlobal,
  $zoomedCountryId,
  changeCountryId,
  changeSchoolId,
  clickSchool,
} from './model';

$countries.on(fetchCountriesFx.doneData, setPayload);
$countriesGeometry.on(fetchCountriesGeometryFx.doneData, setPayload);
$schoolsGlobal.on(fetchSchoolsGlobal.doneData, setPayload);
$country.on(fetchCountryFx.doneData, setPayload);
$countryId.on(changeCountryId, setPayload);
$schools.on(fetchSchoolsFx.doneData, (_, payload) => payload.geojson);
$hasConnectivityStatus.on(
  fetchSchoolsFx.doneData,
  (_, payload) => payload.hasConnectivityStatus
);
$hasConnectivity.on(
  fetchSchoolsFx.doneData,
  (_, payload) => payload.hasConnectivity
);
$hasCoverageType.on(
  fetchSchoolsFx.doneData,
  (_, payload) => payload.hasCoverageType
);
$hasCoverageAvailability.on(
  fetchSchoolsFx.doneData,
  (_, payload) => payload.hasCoverageAvailability
);

$school.on(fetchSchoolFx.doneData, setPayload);
$schoolId.on(changeSchoolId, setPayload);
$countryWeeklyStats.on(fetchCountryWeeklyStatsFx.doneData, setPayload);
$countryDailyStats.on(fetchCountryDailyStatsFx.doneData, setPayload);
$schoolDailyStats.on(fetchSchoolDailyStatsFx.doneData, setPayload);

$country.reset(changeCountryId, fetchCountryFx.fail);
$schools.reset(changeCountryId, fetchSchoolsFx.fail);
$school.reset(fetchSchoolFx.fail);

sample({
  source: combine([$hasConnectivityStatus, $hasConnectivity]),
  fn: ([hasConnectivityStatus, hasConnectivity]) =>
    Boolean(hasConnectivityStatus || hasConnectivity),
  target: $countryHasConnectivity,
});

sample({
  source: combine([$hasCoverageType, $hasCoverageAvailability]),
  fn: ([hasCoverageType, hasCoverageAvailability]) =>
    Boolean(hasCoverageType || hasCoverageAvailability),
  target: $countryHasCoverage,
});

sample({
  source: combine([$countryHasConnectivity, $countryHasCoverage]),
  fn: ([countryHasConnectivity, countryHasCoverage]) => {
    if (!countryHasConnectivity && countryHasCoverage) {
      return 'coverage';
    }
    return 'connectivity';
  },
  target: $mapType,
});

const onClosePopup = guard($isOpenPopup, { filter: getInverted });
$schoolId.reset(onClosePopup);

$countryWeeklyStats.reset(
  changeCountryId,
  fetchCountryWeeklyStatsFx,
  nextWeek,
  previousWeek
);

$countryDailyStats.reset(
  changeCountryId,
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
  countryId: $countryId,
  schoolId: $schoolId,
  zoomedCountryId: $zoomedCountryId,
  isMobile: $isMobile,
  hasConnectivityStatus: $hasConnectivityStatus,
  hasCoverageType: $hasCoverageType,
});

// Routing
const isEqualText = (a: string, b: string) =>
  a.toLocaleLowerCase() === b.toLocaleLowerCase();

sample({
  source: combine([mapCountry.params, $map]),
  fn: ([params]) => params?.code ?? null,
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

// Fetch country data and schools data
forward({
  from: guard(changeCountryId, { filter: Boolean }),
  to: [fetchSchoolsFx, fetchCountryFx],
});

guard({
  source: combine([$countryId, $week], ([countryId, week]) => ({
    countryId,
    week,
  })),
  filter: ({ countryId }) => Boolean(countryId),
  target: fetchCountryWeeklyStatsFx,
});

guard({
  source: combine([$countryId, $week], ([countryId, interval]) => ({
    countryId,
    interval,
  })),
  filter: ({ countryId }) => Boolean(countryId),
  target: fetchCountryDailyStatsFx,
});

guard({
  source: combine([$schoolId, $week], ([schoolId, week]) => ({
    schoolId,
    interval: week,
  })),
  filter: ({ schoolId }) => Boolean(schoolId),
  target: fetchSchoolDailyStatsFx,
});

// Zoom to country bounds
sample({
  source: guard($mapContext, {
    filter: ({ countryId, zoomedCountryId }) =>
      Boolean(countryId && countryId !== zoomedCountryId),
  }),
  fn: ({ map, countryId, countriesGeometry, country, isMobile }) => ({
    map,
    countryId,
    countriesGeometry,
    country,
    isMobile,
  }),
  target: zoomToCountryFx,
});

$zoomedCountryId.on(zoomToCountryFx.doneData, setPayload);
$zoomedCountryId.reset(leaveCountryRouteFx.done);

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
  clock: combine([$schoolsGlobal, $map]),
  fn: ({ paintData, map, countryId }, [schoolsGlobal]) => ({
    map,
    paintData,
    schoolsGlobal,
    countryId,
  }),
  target: updateGlobalSchoolsFx,
});

sample({
  source: $mapContext,
  clock: merge([schoolsReceived, $map]),
  fn: ({
    map,
    schools,
    mapType,
    hasConnectivityStatus,
    hasCoverageType,
    paintData,
  }) => ({
    map,
    schools,
    mapType,
    hasConnectivityStatus,
    hasCoverageType,
    paintData,
  }),
  target: updateSchoolsFx,
});

sample({
  source: $mapContext,
  clock: changeCountryId,
  fn: ({ map, paintData }) => ({ map, paintData }),
  target: removeCountryFx,
});

sample({
  source: guard($map, { filter: Boolean }),
  clock: changeCountryId,
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
  fn: ({ map, paintData, countryId }, countriesGeoJson) => ({
    map,
    paintData,
    countriesGeoJson,
    countryId,
  }),
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
  clock: guard($schoolId, { filter: Boolean }),
  fn: ({ countryId, schoolId }) => ({ countryId, schoolId }),
  target: fetchSchoolFx,
});

// Change map type
sample({
  source: $mapContext,
  clock: changeMapType,
  fn: (
    { map, hasConnectivityStatus, hasCoverageType, paintData },
    mapType
  ) => ({
    map,
    mapType,
    hasConnectivityStatus,
    hasCoverageType,
    paintData,
  }),
  target: updateSchoolsColorsFx,
});

$countryInfoPending.on(fetchCountryWeeklyStatsFx.pending, setPayload);
