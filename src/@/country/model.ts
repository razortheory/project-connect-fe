import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';

import { fetchSchoolFx } from '~/api/project-connect';
import {
  Country,
  CountryBasic,
  CountryGeometry,
  CountryWeeklyStats,
  DailyStats,
} from '~/api/types';

export const changeCountryCode = createEvent<string>();

export const $countryCode = createStore<string>('');
export const $countriesGeometry = createStore<CountryGeometry[] | null>(null);
export const $countries = createStore<CountryBasic[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $schoolsGlobal = createStore<FeatureCollection | null>(null);
export const $schools = createStore<FeatureCollection | null>(null);
export const $country = createStore<Country | null>(null);
export const $schoolPending = fetchSchoolFx.pending;
export const $countryWeeklyStats = createStore<CountryWeeklyStats | null>(null);
export const $countryDailyStats = createStore<DailyStats[] | null>(null);
export const $zoomedCountryCode = createStore<string>('');
export const $countryInfoPending = createStore(false);
export const $countryHasConnectivity = createStore(false);
export const $countryHasCoverage = createStore(false);
