import { FeatureCollection } from 'geojson';

import { CountryData, CountryGeometryData } from '~/api/types';

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