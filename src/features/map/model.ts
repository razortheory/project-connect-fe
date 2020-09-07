import { createEffect, createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';

import { defaultStyle } from './constants';
import { Center, InitMapOptions, Map, Style } from './types';

export const initMap = createEvent<InitMapOptions>();
export const changeMap = createEvent<Map>();
export const changeStyle = createEvent<Style>();
export const setCenter = createEvent<Center>();
export const zoomIn = createEvent();
export const zoomOut = createEvent();
export const selectCountry = createEvent<number>();

export const fetchCountriesGeometryDataFx = createEffect<
  void,
  FeatureCollection
>();

export const $map = createStore<Map | null>(null);
export const $style = createStore<Style>(defaultStyle);
export const $selectedCountryId = createStore<number>(0);
export const $countriesGeometryData = createStore<FeatureCollection | null>(
  null
);
