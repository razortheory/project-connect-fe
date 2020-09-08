import { Geometry } from 'geojson';
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

export type CountryData = {
  id: number;
  name: string;
  code: string;
  flag: string;
  map_preview: null | string;
  description: null | string;
  data_source: null | string;
  integration_status: null | string;
  date_of_join: null | string;
  schools_with_data_percentage: null | string;
};

export type CountryGeometryData = {
  id: number;
  geometry_simplified: Geometry;
};

export type SchoolData = {
  id: number;
  name: string;
  geopoint: Geometry;
};
