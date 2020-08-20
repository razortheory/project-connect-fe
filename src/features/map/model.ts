import { createEvent, createStore } from 'effector';

export type MapTheme = 'dark' | 'light' | 'satellite' | 'accessible';

export const changeMapTheme = createEvent<MapTheme>();
export const incrementZoom = createEvent();
export const decrementZoom = createEvent();

export const $mapTheme = createStore<MapTheme>('dark');
export const $mapZoom = createStore<number>(2);
