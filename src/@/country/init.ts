import { add, sub } from 'date-fns';
import { combine, forward, guard, merge, sample } from 'effector';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchCountryDailyStatsFx,
  fetchCountryFx,
  fetchCountryHistoryFx,
  fetchCountryWeeklyStatsFx,
  fetchSchoolDailyStatsFx,
  fetchSchoolFx,
  fetchSchoolHistoryFx,
  fetchSchoolsFx,
} from '~/api/project-connect';
import { $isMobile } from '~/core/media-query';
import { mapCountry } from '~/core/routes';
import { getInterval, isCurrentInterval } from '~/lib/date-fns-kit';
import { getInverted, getVoid, onFalse, setPayload } from '~/lib/effector-kit';

import { getCountriesGeoJson } from '@/country/lib';
import { initMapFx } from '@/map/effects';
import { $map, $mapType, $stylePaintData, changeMapType } from '@/map/model';
import { $week, nextWeek, previousWeek } from '@/sidebar/model';

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
  $countryCode,
  $countryDailyStats,
  $countryId,
  $countryInfoPending,
  $countryWeeklyStats,
  $historyData,
  $historyDataPending,
  $historyDataType,
  $historyInterval,
  $historyIntervalUnit,
  $historyPlaceName,
  $isCurrentHistoryInterval,
  $isOpenHistoryModal,
  $isOpenPopup,
  $popup,
  $school,
  $schoolDailyStats,
  $schoolId,
  $schools,
  $zoomedCountryId,
  changeCountryId,
  changeHistoryDataType,
  changeHistoryIntervalUnit,
  changeIsOpenPopup,
  changeSchoolId,
  clickSchool,
  closeHistoryModal,
  nextHistoryInterval,
  previousHistoryInterval,
} from './model';

$countries.on(fetchCountriesFx.doneData, setPayload);
$countriesGeometry.on(fetchCountriesGeometryFx.doneData, setPayload);
$country.on(fetchCountryFx.doneData, setPayload);
$countryId.on(changeCountryId, setPayload);
$schools.on(fetchSchoolsFx.doneData, setPayload);
$school.on(fetchSchoolFx.doneData, setPayload);
$schoolId.on(changeSchoolId, setPayload);
$countryWeeklyStats.on(fetchCountryWeeklyStatsFx.doneData, setPayload);
$countryDailyStats.on(fetchCountryDailyStatsFx.doneData, setPayload);
$schoolDailyStats.on(fetchSchoolDailyStatsFx.doneData, setPayload);
$isOpenPopup.on(changeIsOpenPopup, setPayload);

$country.reset(changeCountryId, fetchCountryFx.fail);
$schools.reset(changeCountryId, fetchSchoolsFx.fail);
$school.reset(fetchSchoolFx.fail);

const onClosePopup = guard($isOpenPopup, onFalse);
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
  isCountryRoute: mapCountry.visible,
  countryId: $countryId,
  schoolId: $schoolId,
  zoomedCountryId: $zoomedCountryId,
  isMobile: $isMobile,
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
  clock: merge([schoolsReceived, $map]),
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
  clock: guard($schoolId, { filter: Boolean }),
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

// History modal
$historyIntervalUnit.on(changeHistoryIntervalUnit, setPayload);
$historyDataType.on(changeHistoryDataType, setPayload);
$historyDataType.reset(closeHistoryModal);
$historyIntervalUnit.reset(closeHistoryModal);

sample({
  source: $week,
  target: $historyInterval,
});

sample({
  source: $historyDataType,
  fn: (historyDataType) => Boolean(historyDataType),
  target: $isOpenHistoryModal,
});

sample({
  source: $historyIntervalUnit,
  fn: (unit) => getInterval(new Date(), unit),
  target: $historyInterval,
});

sample({
  source: $week,
  clock: closeHistoryModal,
  target: $historyInterval,
});

sample({
  source: combine([$historyInterval, $historyIntervalUnit]),
  fn: ([interval, unit]) => isCurrentInterval(interval, unit),
  target: $isCurrentHistoryInterval,
});

sample({
  source: combine([$historyInterval, $historyIntervalUnit]),
  clock: nextHistoryInterval,
  fn: ([interval, unit]) =>
    getInterval(add(interval.start, { [`${unit}s`]: 1 }), unit),
  target: $historyInterval,
});

sample({
  source: combine([$historyInterval, $historyIntervalUnit]),
  clock: previousHistoryInterval,
  fn: ([interval, unit]) =>
    getInterval(sub(interval.start, { [`${unit}s`]: 1 }), unit),
  target: $historyInterval,
});

sample({
  source: guard({
    source: combine({
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
      countryDailyStats: $countryDailyStats,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'country' && interval === week),
  }),
  fn: ({ countryDailyStats }) => countryDailyStats,
  target: $historyData,
});

sample({
  source: guard({
    source: combine({
      countryId: $countryId,
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'country' && interval !== week),
  }),
  fn: ({ countryId, interval }) => ({ countryId, interval }),
  target: fetchCountryHistoryFx,
});

sample({
  source: guard({
    source: combine({
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
      schoolDailyStats: $schoolDailyStats,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'school' && interval === week),
  }),
  fn: ({ schoolDailyStats }) => schoolDailyStats,
  target: $historyData,
});

sample({
  source: guard({
    source: combine({
      schoolId: $schoolId,
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'school' && interval !== week),
  }),
  fn: ({ schoolId, interval }) => ({ schoolId, interval }),
  target: fetchSchoolHistoryFx,
});

$historyData.on(fetchCountryHistoryFx.doneData, setPayload);
$historyData.on(fetchSchoolHistoryFx.doneData, setPayload);
$historyData.reset(closeHistoryModal);

sample({
  source: guard({
    source: combine({
      historyDataType: $historyDataType,
      country: $country,
    }),
    filter: ({ historyDataType, country }) =>
      Boolean(historyDataType === 'country' && country),
  }),
  fn: ({ country }) => country?.name ?? '',
  target: $historyPlaceName,
});

sample({
  source: guard({
    source: combine({
      historyDataType: $historyDataType,
      school: $school,
    }),
    filter: ({ historyDataType, school }) =>
      Boolean(historyDataType === 'school' && school),
  }),
  fn: ({ school }) => school?.name ?? '',
  target: $historyPlaceName,
});

$historyPlaceName.reset(closeHistoryModal);

sample({
  source: combine([
    fetchCountryHistoryFx.pending,
    fetchSchoolHistoryFx.pending,
  ]),
  fn: (states) => states.some(Boolean),
  target: $historyDataPending,
});

sample({
  source: combine([fetchCountryFx.pending, fetchCountryWeeklyStatsFx.pending]),
  fn: (states) => states.some(Boolean),
  target: $countryInfoPending,
});
