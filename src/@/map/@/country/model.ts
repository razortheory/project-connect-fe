import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';
import mapboxGL, { MapLayerMouseEvent } from 'mapbox-gl';

import { fetchSchoolFx } from '~/api/project-connect';
import {
  Country,
  CountryBasic,
  CountryGeometry,
  CountryWeeklyStats,
  DailyStats,
  School,
} from '~/api/types';

export const changeCountryId = createEvent<number>();
export const changeSchoolId = createEvent<number>();
export const clickSchool = createEvent<MapLayerMouseEvent>();
export const changeIsOpenPopup = createEvent<boolean>();

export const $countryCode = createStore<string | null>('');
export const $countryId = createStore(0); // TODO: Use nullable value <number | null> for $countryId and $schoolId
export const $schoolId = createStore(0);
export const $countriesGeometry = createStore<CountryGeometry[] | null>(null);
export const $countries = createStore<CountryBasic[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $schools = createStore<FeatureCollection | null>(null);
export const $country = createStore<Country | null>(null);
export const $school = createStore<School | null>(null);
export const $schoolPending = fetchSchoolFx.pending;
export const $popup = createStore<mapboxGL.Popup | null>(null);
export const $isOpenPopup = createStore(false);
export const $countryWeeklyStats = createStore<CountryWeeklyStats | null>(null);
export const $countryDailyStats = createStore<DailyStats[] | null>(null);
export const $schoolDailyStats = createStore<DailyStats[] | null>(null);
export const $zoomedCountryId = createStore(0);
