import { createEffect } from 'effector';
import { FeatureCollection } from 'geojson';

import { createRequest } from '~/lib/request';

import { getSchoolsGeoJson } from '@/map/lib/get-schools-geo-json';

import {
  CountryData,
  CountryGeometryData,
  CountryMetaData,
  GlobalStatsData,
  SchoolData,
} from './types';

export const request = createRequest({
  baseUrl: 'https://api.projectconnect.razortheory.com/',
});

export const fetchCountryDataFx = createEffect(
  async (countryId: number): Promise<CountryData> =>
    request(`api/locations/countries/${countryId}/`)
);

export const fetchCountrySchoolsFx = createEffect(
  async (countryId: number): Promise<FeatureCollection> =>
    request({
      url: `api/locations/countries/${countryId}/schools/`,
      fn: ({ jsonData }) => getSchoolsGeoJson(jsonData as SchoolData[]),
    })
);

export const fetchCountriesDataFx = createEffect(
  async (): Promise<CountryMetaData[]> => request('api/locations/countries/')
);

export const fetchCountriesGeometryDataFx = createEffect(
  async (): Promise<CountryGeometryData[]> =>
    request('api/locations/countries-boundary/')
);

export const fetchGlobalStatsDataFx = createEffect(
  async (): Promise<GlobalStatsData> => request('api/statistics/global-stat/')
);
