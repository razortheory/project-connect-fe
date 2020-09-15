import { Map as MapboxMap, StylePaintData } from '~/features/map/types';

// Experimental named params
export type MapX = {
  map: MapboxMap | null;
};

export type Map = {
  map: MapboxMap;
};

export type PaintData = {
  paintData: StylePaintData;
};

export type CountryId = {
  countryId: number;
};

export type ChangeCountry = MapX & PaintData & CountryId;
export type UpdateCountry = Map & PaintData & CountryId;
export type UpdateSchools = Map & CountryId;
