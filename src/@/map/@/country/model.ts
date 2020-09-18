import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';

import { CountryData, CountryGeometryData } from '@/map/types';

export const changeCountryId = createEvent<number>();

export const $selectedCountryId = createStore<number>(0);
export const $countriesGeometryData = createStore<CountryGeometryData[] | null>(
  null
);
export const $countriesData = createStore<CountryData[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $countrySchools = createStore<FeatureCollection | null>(null);
export const $countryData = createStore<CountryData | null>(null);
