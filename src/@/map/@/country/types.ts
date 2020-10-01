import { FeatureCollection } from 'geojson';
import type mapboxGl from 'mapbox-gl';
import { MapMouseEvent } from 'mapbox-gl';

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
};

export type UpdateSchoolsColors = {
  map: Map | null;
  mapType: MapType;
};

export type ZoomToCountryBounds = {
  map: Map | null;
  countryId: number;
  countriesGeometry: CountryGeometry[] | null;
  country: Country | null;
};

export type LeaveCountryRoute = {
  map: Map | null;
  paintData: StylePaintData;
  popup: mapboxGl.Popup | null;
};

export type AddCountries = {
  map: Map | null;
  paintData: StylePaintData;
  countriesGeoJson: FeatureCollection;
  isCountryRoute: boolean;
};

export type AddSchoolPopup = {
  map: Map | null;
  popup: mapboxGl.Popup | null;
  event: MapMouseEvent;
};

export type EmptyObject = Record<string, never>;
