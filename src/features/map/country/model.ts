import { createEffect, createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';

import { CountryData, CountryGeometryData, Map } from '~/features/map/types';

import {
  AddCountries,
  LeaveCountryRoute,
  UpdateCountry,
  UpdateSchools,
  ZoomToCountryBounds,
} from './types';

export const $selectedCountryId = createStore<number>(0);
export const $countriesGeometryData = createStore<CountryGeometryData[] | null>(
  null
);
export const $countriesData = createStore<CountryData[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);

export const updateCountryFx = createEffect<UpdateCountry, void>();
export const updateSchoolsFx = createEffect<UpdateSchools, void>();
export const zoomToCountryBoundsFx = createEffect<ZoomToCountryBounds, void>();
export const removeCountryFx = createEffect<Map, void>();
export const removeSchoolsFx = createEffect<Map, void>();
export const leaveCountryRouteFx = createEffect<LeaveCountryRoute, void>();
export const addCountriesFx = createEffect<AddCountries, void>();
export const changeCountryId = createEvent<number>();
export const fetchCountriesDataFx = createEffect<void, CountryData[]>();
export const fetchCountriesGeometryDataFx = createEffect<
  void,
  CountryGeometryData[]
>();
