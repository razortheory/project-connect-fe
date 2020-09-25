import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';
import { MapLayerMouseEvent } from 'mapbox-gl';

import {
  CountryData,
  CountryGeometryData,
  CountryMetaData,
  SchoolDetailsData,
} from '~/api/types';

export const changeCountryId = createEvent<number>();
export const changeSchoolId = createEvent<number>();
export const clickSchool = createEvent<MapLayerMouseEvent>();

export const $countryId = createStore<number>(0);
export const $schoolId = createStore<number>(0);
export const $countriesGeometryData = createStore<CountryGeometryData[] | null>(
  null
);
export const $countriesData = createStore<CountryMetaData[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $countrySchools = createStore<FeatureCollection | null>(null);
export const $countryData = createStore<CountryData | null>(null);
export const $popup = createStore<HTMLDivElement | null>(null);
export const $schoolDetailsData = createStore<SchoolDetailsData | null>(null);
