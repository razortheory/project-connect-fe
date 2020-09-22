import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';
import { MapMouseEvent } from 'mapbox-gl';

import { CountryData, CountryGeometryData } from '@/map/types';

import { EmptyObject, PopupContext } from './types';

export const changeCountryId = createEvent<number>();
export const clickSchool = createEvent<MapMouseEvent>();
export const updatePopupContext = createEvent<PopupContext>();

export const $countryId = createStore<number>(0);
export const $countriesGeometryData = createStore<CountryGeometryData[] | null>(
  null
);
export const $countriesData = createStore<CountryData[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $countrySchools = createStore<FeatureCollection | null>(null);
export const $countryData = createStore<CountryData | null>(null);
export const $popup = createStore<HTMLDivElement | null>(null);
export const $popupContext = createStore<PopupContext | EmptyObject>({});
