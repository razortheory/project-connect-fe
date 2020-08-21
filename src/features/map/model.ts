import { createEvent, createStore } from 'effector';

export type MapTheme = 'dark' | 'light' | 'satellite' | 'accessible';

export const changeMapTheme = createEvent<MapTheme>();
export const incrementZoom = createEvent();
export const decrementZoom = createEvent();
export const changeZoom = createEvent<number>();

export const initialMapOptions = {
  zoom: 2,
  lng: 0,
  lat: 40,
};

export const $mapTheme = createStore<MapTheme>('dark');
export const $mapZoom = createStore<number>(initialMapOptions.zoom);
