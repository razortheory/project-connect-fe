import { FeatureCollection, Geometry } from 'geojson';

import { Map, StylePaintData } from '@/map/types';

export type UpdateCountry = {
  map: Map | null;
  paintData: StylePaintData;
  countryData: CountryData | null;
};

export type UpdateSchools = {
  map: Map | null;
  countrySchools: FeatureCollection | null;
};

export type ZoomToCountryBounds = {
  map: Map | null;
  countryId: number;
  countriesGeometry: CountryGeometryData[] | null;
};

export type LeaveCountryRoute = {
  map: Map | null;
  paintData: StylePaintData;
};

export type AddCountries = {
  map: Map | null;
  paintData: StylePaintData;
  countriesGeoJson: FeatureCollection;
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
