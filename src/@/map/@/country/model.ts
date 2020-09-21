import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';

import { CountryData, CountryGeometryData, CountryMetaData } from '~/api/types';

export const changeCountryId = createEvent<number>();

export const $selectedCountryId = createStore<number>(0);
export const $countriesGeometryData = createStore<CountryGeometryData[] | null>(
  null
);
export const $countriesData = createStore<CountryMetaData[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $countrySchools = createStore<FeatureCollection | null>(null);
export const $countryData = createStore<CountryData | null>(null);
