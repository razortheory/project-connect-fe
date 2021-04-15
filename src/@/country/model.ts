import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';
import { MapMouseEvent } from 'mapbox-gl';

import { checkSchoolHasHistory, fetchSchoolFx } from '~/api/project-connect';
import {
  Country,
  CountryBasic,
  CountryGeometry,
  CountryWeeklyStats,
  DailyStats,
  School,
} from '~/api/types';

export const changeCountryCode = createEvent<string>();
export const changeSchoolId = createEvent<number>();
export const clickSchool = createEvent<MapMouseEvent>();

export const $countryCode = createStore<string>('');
export const $schoolId = createStore(0);
export const $countriesGeometry = createStore<CountryGeometry[] | null>(null);
export const $countries = createStore<CountryBasic[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $schoolsGlobal = createStore<FeatureCollection | null>(null);
export const $schools = createStore<FeatureCollection | null>(null);
export const $country = createStore<Country | null>(null);
export const $school = createStore<School | null>(null);
export const $schoolHasHistory = createStore(false);
export const $schoolPending =
  fetchSchoolFx.pending || checkSchoolHasHistory.pending;
export const $countryWeeklyStats = createStore<CountryWeeklyStats | null>(null);
export const $countryDailyStats = createStore<DailyStats[] | null>(null);
export const $schoolDailyStats = createStore<DailyStats[] | null>(null);
export const $zoomedCountryCode = createStore<string>('');
export const $countryInfoPending = createStore(false);
export const $countryHasConnectivity = createStore(false);
export const $countryHasCoverage = createStore(false);
