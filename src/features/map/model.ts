import { createEvent, createStore } from 'effector';

import { defaultStyle, stylePaintData } from './constants';
import { Center, InitMapOptions, Map, Style, StylePaintData } from './types';

export const initMap = createEvent<InitMapOptions>();
export const changeMap = createEvent<Map>();
export const changeStyle = createEvent<Style>();
export const setCenter = createEvent<Center>();
export const zoomIn = createEvent();
export const zoomOut = createEvent();

export const $map = createStore<Map | null>(null);
export const $style = createStore<Style>(defaultStyle);
export const $stylePaintData = createStore<StylePaintData>(
  stylePaintData[defaultStyle]
);

export const $pending = createStore<boolean>(false);
