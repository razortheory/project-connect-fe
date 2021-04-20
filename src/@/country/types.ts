import { FeatureCollection } from 'geojson';
import type mapboxGl from 'mapbox-gl';

import { Country, CountryGeometry } from '~/api/types';

import { Map, MapType, StylePaintData } from '@/map/types';

export type UpdateCountry = {
  map: Map | null;
  paintData: StylePaintData;
  country: Country | null;
};

export type UpdateSchools = {
  map: Map | null;
  schools: FeatureCollection | null;
  mapType: MapType;
  paintData: StylePaintData;
};

export type UpdateGlobalSchools = {
  map: Map | null;
  paintData: StylePaintData;
  schoolsGlobal: FeatureCollection | null;
  countryCode: string;
};

export type UpdateSchoolsColors = {
  map: Map | null;
  mapType: MapType;
  paintData: StylePaintData;
};

export type ZoomToCountryBounds = {
  map: Map | null;
  countryCode: string;
  countriesGeometry: CountryGeometry[] | null;
  country: Country | null;
  isMobile: boolean;
};

export type LeaveCountryRoute = {
  map: Map | null;
  paintData: StylePaintData;
  popup: mapboxGl.Popup | null;
};

export type AddCountries = {
  map: Map | null;
  paintData: StylePaintData;
  countriesGeoJson: FeatureCollection | null;
  countryCode: string;
};
