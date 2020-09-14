import { Geometry } from 'geojson';
import type mapboxGl from 'mapbox-gl';

export type Style = 'dark' | 'light' | 'satellite' | 'accessible';
export type Center = mapboxGl.LngLatLike;
export type Zoom = number;
export type Map = mapboxGl.Map;

export type CountriesPaintData = {
  background: string;
  countryNotVerified: string;
  countryVerified: string;
  countryWithConnectivity: string;
  countrySelected: string;
  countryNotSelected: string;
  opacity: number;
  opacityHover: number;
};

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
  integration_status: IntegrationStatus;
  date_of_join: null | string;
  schools_with_data_percentage: null | string;
  geometry?: Geometry;
};

export type IntegrationStatus = 0 | 1 | 2 | 3;

export type CountryGeometryData = {
  id: number;
  geometry_simplified: Geometry;
};

export type SchoolData = {
  id: number;
  name: string;
  geopoint: Geometry;
  connectivity_status: ConnectivityStatus;
  coverage_status: string;
};

export type ConnectivityStatus = 'no' | 'unknown' | 'moderate' | 'good';
