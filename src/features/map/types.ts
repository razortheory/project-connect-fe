import type mapboxGl from 'mapbox-gl';

export type Style = 'dark' | 'light' | 'satellite' | 'accessible';
export type Center = mapboxGl.LngLatLike;
export type Zoom = number;
export type Map = mapboxGl.Map;

export type InitMapOptions = {
  style: Style;
  container: HTMLElement;
  center?: Center;
  zoom?: Zoom;
};
