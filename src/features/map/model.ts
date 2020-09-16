import { createEffect, createEvent, createStore } from 'effector';

import { defaultStyle, stylePaintData } from './constants';
import {
  Center,
  InitMapOptions,
  Map,
  Marker,
  Style,
  StylePaintData,
} from './types';

export const changeMap = createEvent<Map>();
export const changeStyle = createEvent<Style>();
export const setCenter = createEvent<Center>();
export const zoomIn = createEvent();
export const zoomOut = createEvent();
export const setLoader = createEvent<Marker>();

export const initMapFx = createEffect<InitMapOptions, void>();
export const addLoaderToMapFx = createEffect<Map | null, void>();
export const removeLoaderFromMapFx = createEffect<Marker | null, void>();

export const $map = createStore<Map | null>(null);
export const $style = createStore<Style>(defaultStyle);
export const $stylePaintData = createStore<StylePaintData>(
  stylePaintData[defaultStyle]
);

export const $pending = createStore<boolean>(false);
export const $loader = createStore<Marker | null>(null);
