import { combine, forward, guard, merge, sample } from 'effector';

import {
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
  fetchCountryDataFx,
  fetchCountrySchoolsFx,
  fetchSchoolDetailsFx,
} from '~/api/project-connect';
import { mapCountry } from '~/core/routes';
import { getInverted, setNull, setPayload } from '~/lib/effector-kit';

import { getCountriesGeoJson } from '@/map/lib/get-countries-geo-json';
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
  $countriesData,
  $countriesGeoJson,
  $countriesGeometryData,
  $countryData,
  $countryId,
  $countrySchools,
  $popup,
  $schoolDetailsData,
  $schoolId,
  changeCountryId,
  changeSchoolId,
  clickSchool,
} from './model';

$countriesData.on(fetchCountriesDataFx.doneData, setPayload);
$countriesGeometryData.on(fetchCountriesGeometryDataFx.doneData, setPayload);
$countrySchools.on(fetchCountrySchoolsFx.doneData, setPayload);
$countryData.on(fetchCountryDataFx.doneData, setPayload);
$countryId.on(changeCountryId, setPayload);
$schoolId.on(changeSchoolId, setPayload);
$schoolDetailsData.on(fetchSchoolDetailsFx.doneData, setPayload);
$schoolDetailsData.on(fetchSchoolDetailsFx.fail, setNull);

$countryData.reset(changeCountryId, fetchCountryDataFx.fail);
$countrySchools.reset(changeCountryId, fetchCountrySchoolsFx.fail);

const $mapContext = combine({
  map: $map,
  mapType: $mapType,
  countriesGeometry: $countriesGeometryData,
  paintData: $stylePaintData,
  countryData: $countryData,
  countrySchools: $countrySchools,
  popup: $popup,
  isCountryRoute: mapCountry.visible,
  countryId: $countryId,
  schoolId: $schoolId,
});

// Fetch country data and schools data
forward({
  from: guard(changeCountryId, { filter: Boolean }),
  to: [fetchCountrySchoolsFx, fetchCountryDataFx],
});

// Zoom to country bounds
sample({
  source: $mapContext,
  fn: ({ map, countryId, countriesGeometry, countryData }) => ({
    map,
    countryId,
    countriesGeometry,
    countryData,
  }),
  target: zoomToCountryFx,
});

// Check received countryData for relevance
const countryDataReceived = guard({
  source: sample({
    source: $countryId,
    clock: fetchCountryDataFx.done,
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
  clock: countryDataReceived,
  fn: ({ map, paintData, countryData }) => ({
    map,
    paintData,
    countryData,
  }),
  target: updateCountryFx,
});

// Check received countrySchools for relevance
const schoolsReceived = guard({
  source: sample({
    source: $countryId,
    clock: fetchCountrySchoolsFx.done,
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
  fn: ({ map, countrySchools, mapType }) => ({
    map,
    countrySchools,
    mapType,
  }),
  target: updateSchoolsFx,
});

// Routing
const isEqualText = (a: string, b: string) =>
  a.toLocaleLowerCase() === b.toLocaleLowerCase();

sample({
  source: $countriesData,
  clock: combine([mapCountry.params, $map]),
  fn: (countriesData, [routeParams]) => {
    if (!countriesData || !routeParams) return 0;
    const countryData = countriesData.find((data) =>
      isEqualText(data.code, routeParams.code)
    );
    return countryData?.id ?? 0;
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
  target: fetchSchoolDetailsFx,
});

// Change map type
sample({
  source: $map,
  clock: changeMapType,
  fn: (map, mapType) => ({ map, mapType }),
  target: updateSchoolsColorsFx,
});
