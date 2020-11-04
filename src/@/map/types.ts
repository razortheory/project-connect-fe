import type mapboxGl from 'mapbox-gl';

export type Style = 'dark' | 'light' | 'satellite' | 'accessible';
export type Center = mapboxGl.LngLatLike;
export type Zoom = number;
export type Map = mapboxGl.Map;
export type Marker = mapboxGl.Marker;

export type StylePaintData = {
  background: string;
  countryNotVerified: string;
  countryVerified: string;
  countryWithConnectivity: string;
  countrySelected: string;
  countryNotSelected: string;
  opacity: number;
  opacityHover: number;
  schoolsNotVerified: string;
  schoolsVerified: string;
  schoolsWithConnectivity: string;
  schoolConnectivity: {
    unknown: string;
    no: string;
    moderate: string;
    good: string;
  };
};

export type InitMapOptions = {
  style: Style;
  container: HTMLElement;
  center?: Center;
  zoom?: Zoom;
};

export type MapType = 'connectivity' | 'coverage';
