import { Map, StylePaintData } from '~/features/map/types';

export type UpdateCountry = {
  map: Map | null;
  paintData: StylePaintData;
  countryId: number;
};

export type UpdateSchools = {
  map: Map | null;
  countryId: number;
};

export type LeaveCountryRoute = {
  map: Map | null;
  paintData: StylePaintData;
};
