// create request
import { FeatureCollection } from 'geojson';

import { createRequest } from '~/lib/request';

import { convertSchoolsDataToGeoJson } from './map-data-helpers';
import { CountryData, CountryGeometryData, SchoolData } from './types';

export const request = createRequest({
  baseUrl: 'https://api.projectconnect.razortheory.com/',
});

export const fetchCountryData = async (
  countryId: number
): Promise<CountryData> => request(`api/locations/countries/${countryId}/`);

export const fetchCountrySchools = async (
  countryId: number
): Promise<FeatureCollection> =>
  request({
    url: `api/locations/countries/${countryId}/schools/`,
    fn: ({ jsonData }) => convertSchoolsDataToGeoJson(jsonData as SchoolData[]),
  });

export const fetchCountriesData = async (): Promise<CountryData[]> =>
  request('api/locations/countries/');

export const fetchCountriesGeometryData = async (): Promise<
  CountryGeometryData[]
> => request('api/locations/countries-boundary/');
