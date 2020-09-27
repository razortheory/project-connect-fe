import { createEvent, createStore } from 'effector';

import { GlobalStatsData } from '~/api/types';

import {
  defaultGlobalStats,
  defaultMapType,
  defaultStyle,
  stylePaintData,
} from './constants';
import { Center, Map, MapType, Marker, Style, StylePaintData } from './types';

export const changeMap = createEvent<Map>();
export const changeMapType = createEvent<MapType>();
export const changeStyle = createEvent<Style>();
export const setCenter = createEvent<Center>();
export const zoomIn = createEvent();
export const zoomOut = createEvent();
export const setLoader = createEvent<Marker>();

export const $map = createStore<Map | null>(null);
export const $mapType = createStore<MapType>(defaultMapType);
export const $style = createStore<Style>(defaultStyle);
export const $stylePaintData = createStore<StylePaintData>(
  stylePaintData[defaultStyle]
);
export const $globalStats = createStore<GlobalStatsData>(defaultGlobalStats);
export const $pending = createStore<boolean>(false);
export const $loader = createStore<Marker | null>(null);
