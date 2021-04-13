import { combine, guard, merge, sample } from 'effector';
import { Point } from 'geojson';

import {
  fetchSchoolDailyStatsFx,
  fetchSchoolFx,
  fetchSchoolsFx,
} from '~/api/project-connect';
import { mapCountry } from '~/core/routes';
import { getInverted, getVoid, setPayload } from '~/lib/effector-kit';

import { leaveCountryRouteFx } from '@/country/effects';
import { $mapContext } from '@/country/init';
import { $countryCode, $schools } from '@/country/model';
import { initMapFx } from '@/map/effects';
import { $map } from '@/map/model';
import {
  closeSchoolPopupFx,
  createSchoolPopupFx,
  handleSchoolClickFx,
  openSchoolPopupFx,
} from '@/popup/effects';
import {
  $isMultipleSchoolsOnPoint,
  $isOpenPopup,
  $popup,
  $school,
  $schoolDailyStats,
  $schoolId,
  $schoolsOnPoint,
  changeIsOpenPopup,
  changeSchoolId,
  clickSchool,
  handleClosePopup,
  nextSchoolOnPoint,
  previousSchoolOnPoint,
} from '@/popup/model';
import { $week, nextWeek, previousWeek } from '@/sidebar/model';

$isOpenPopup.on(changeIsOpenPopup, setPayload);
$schoolId.on(changeSchoolId, setPayload);
$schoolDailyStats.on(fetchSchoolDailyStatsFx.doneData, setPayload);

$schoolId.reset(leaveCountryRouteFx.doneData);
$school.on(fetchSchoolFx.doneData, setPayload);
$school.reset(fetchSchoolFx.fail);
$schoolsOnPoint.reset(leaveCountryRouteFx.doneData);

$schoolDailyStats.reset(
  changeSchoolId,
  fetchSchoolDailyStatsFx,
  nextWeek,
  previousWeek
);

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

// Handle click on school point
sample({
  source: $mapContext,
  clock: clickSchool,
  fn: ({ map, popup, countryCode }, event) => ({
    map,
    popup,
    event,
    countryCode,
  }),
  target: handleSchoolClickFx,
});

// Open school popup after init map if school id exist in the url
sample({
  source: guard({
    source: $mapContext,
    filter: ({ schoolId }) => Boolean(schoolId),
  }),
  clock: merge([fetchSchoolsFx.doneData, $map]),
  fn: ({ schoolId, schools, popup, map, countryCode }) => ({
    schoolId,
    schools,
    popup,
    map,
    countryCode,
  }),
  target: openSchoolPopupFx,
});

// Open school popup
sample({
  source: guard({
    source: $mapContext,
    filter: ({ schools }) => Boolean(schools),
  }),
  clock: changeSchoolId,
  fn: ({ schoolId, schools, popup, map, countryCode }) => ({
    schoolId,
    schools,
    popup,
    map,
    countryCode,
  }),
  target: openSchoolPopupFx,
});

// Fetch school data
guard({
  source: combine([$schoolId, $week], ([schoolId, week]) => ({
    schoolId,
    interval: week,
  })),
  filter: ({ schoolId }) => Boolean(schoolId),
  target: fetchSchoolDailyStatsFx,
});

// Handle close popup after changing url
sample({
  source: guard(combine([mapCountry.params, $popup]), {
    filter: ([params]) => getInverted(params?.schoolId),
  }),
  target: handleClosePopup,
});

// Handle close popup
sample({
  source: combine([$popup, $countryCode]),
  clock: handleClosePopup,
  fn: ([popup, countryCode]) => ({ popup, countryCode }),
  target: closeSchoolPopupFx,
});

// Open popup if school id exist in the url
sample({
  source: guard({
    source: mapCountry.params,
    filter: (params) => Boolean(params?.schoolId),
  }),
  fn: (params) => Number(params?.schoolId) ?? 0,
  target: changeSchoolId,
});

// Fetch school data
sample({
  source: $mapContext,
  clock: guard($schoolId, { filter: Boolean }),
  fn: ({ countryCode, schoolId }) => ({ countryCode, schoolId }),
  target: fetchSchoolFx,
});

// Multiple school on the point
sample({
  source: combine([$schools, $schoolId]),
  fn: ([schools, schoolId]) => {
    if (!schools || !schoolId) {
      return [];
    }
    const schoolCoordinates = (schools.features.find(
      (school) => school.id === schoolId
    )?.geometry as Point)?.coordinates;

    if (!schoolCoordinates) {
      return [];
    }

    const schoolsOnPoint: number[] = [];
    schools.features.forEach((school) => {
      if (
        (school.geometry as Point).coordinates[0] === schoolCoordinates[0] &&
        (school.geometry as Point).coordinates[1] === schoolCoordinates[1]
      ) {
        schoolsOnPoint.push(school.id as number);
      }
    });
    return schoolsOnPoint.reverse();
  },
  target: $schoolsOnPoint,
});

sample({
  source: $schoolsOnPoint,
  fn: (schoolsOnPoint) => schoolsOnPoint.length > 1,
  target: $isMultipleSchoolsOnPoint,
});

// Navigation for schools in the popup
sample({
  source: combine([$schoolsOnPoint, $schoolId, $countryCode]),
  clock: nextSchoolOnPoint,
  fn: ([schoolsOnPoint, schoolId, countryCode]) => {
    const activeIndex = schoolsOnPoint.findIndex((id) => id === schoolId);
    const nextIndex =
      activeIndex + 1 >= schoolsOnPoint.length ? 0 : activeIndex + 1;
    return { code: countryCode, schoolId: `${schoolsOnPoint[nextIndex]}` };
  },
  target: mapCountry.navigate,
});

sample({
  source: combine([$schoolsOnPoint, $schoolId, $countryCode]),
  clock: previousSchoolOnPoint,
  fn: ([schoolsOnPoint, schoolId, countryCode]) => {
    const activeIndex = schoolsOnPoint.findIndex((id) => id === schoolId);
    const previousIndex =
      activeIndex - 1 < 0 ? schoolsOnPoint.length - 1 : activeIndex - 1;
    return { code: countryCode, schoolId: `${schoolsOnPoint[previousIndex]}` };
  },
  target: mapCountry.navigate,
});
