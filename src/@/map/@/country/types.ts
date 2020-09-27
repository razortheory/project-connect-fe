import { FeatureCollection } from 'geojson';
import { MapMouseEvent } from 'mapbox-gl';

import { CountryData, CountryGeometryData } from '~/api/types';

import { Map, MapType, StylePaintData } from '@/map/types';

export type UpdateCountry = {
  map: Map | null;
  paintData: StylePaintData;
  countryData: CountryData | null;
};

export type UpdateSchools = {
  map: Map | null;
  countrySchools: FeatureCollection | null;
  mapType: MapType;
};

export type UpdateSchoolsColors = {
  map: Map | null;
  mapType: MapType;
};

export type ZoomToCountryBounds = {
  map: Map | null;
  countryId: number;
  countriesGeometry: CountryGeometryData[] | null;
  countryData: CountryData | null;
};

export type LeaveCountryRoute = {
  map: Map | null;
  paintData: StylePaintData;
};

export type AddCountries = {
  map: Map | null;
  paintData: StylePaintData;
  countriesGeoJson: FeatureCollection;
  isCountryRoute: boolean;
};

export type AddSchoolPopup = {
  map: Map | null;
  popup: HTMLDivElement | null;
  event: MapMouseEvent;
};

export type EmptyObject = Record<string, never>;
