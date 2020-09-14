import { createEffect, createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';
import { MapMouseEvent } from 'mapbox-gl';

import { defaultStyle } from './constants';
import { Center, CountryData, InitMapOptions, Map, Style } from './types';

export const initMap = createEvent<InitMapOptions>();
export const changeMap = createEvent<Map>();
export const changeStyle = createEvent<Style>();
export const setCenter = createEvent<Center>();
export const zoomIn = createEvent();
export const zoomOut = createEvent();
export const changeCountryId = createEvent<number>();

export const fetchCountriesGeometryDataFx = createEffect<
  void,
  FeatureCollection
>();
export const fetchCountriesDataFx = createEffect<void, CountryData[]>();

export const $map = createStore<Map | null>(null);
export const $style = createStore<Style>(defaultStyle);
export const $selectedCountryId = createStore<number>(0);
export const $countriesGeometryData = createStore<FeatureCollection | null>(
  null
);
export const $countriesData = createStore<CountryData[] | null>(null);

export const $popup = createStore<HTMLDivElement | null>(null);
export const clickSchool = createEvent<MapMouseEvent>();
