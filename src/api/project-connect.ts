import { getWeek, getYear, Interval } from 'date-fns';
import { createEffect } from 'effector';
import { FeatureCollection } from 'geojson';

import { createRequest } from '~/lib/request';

import { getSchoolsGeoJson } from '@/map/@/country/lib';

import {
  Country,
  CountryBasic,
  CountryGeometry,
  CountryStatistics,
  GlobalStats,
  School,
  SchoolBasic,
} from './types';

export const request = createRequest({
  baseUrl: 'https://api.projectconnect.razortheory.com/',
});

export const fetchCountryFx = createEffect(
  async (countryId: number): Promise<Country> =>
    request(`api/locations/countries/${countryId}/`)
);

export const fetchCountryStatistics = createEffect(
  async ({
    countryId,
    week,
  }: {
    countryId: number;
    week: Interval;
  }): Promise<CountryStatistics> => {
    const weekNumber = getWeek(week.start);
    const year = getYear(week.start);
    return request(
      `api/statistics/country/${countryId}/weekly-stat/${year}/${weekNumber}/`
    );
  }
);

export const fetchSchoolsFx = createEffect(
  async (countryId: number): Promise<FeatureCollection> =>
    request({
      url: `api/locations/countries/${countryId}/schools/`,
      fn: ({ jsonData }) => getSchoolsGeoJson(jsonData as SchoolBasic[]),
    })
);

export const fetchSchoolFx = createEffect(
  async ({
    countryId,
    schoolId,
  }: {
    countryId: number;
    schoolId: number;
  }): Promise<School> =>
    request(`api/locations/countries/${countryId}/schools/${schoolId}/`)
);

export const fetchCountriesFx = createEffect(
  async (): Promise<CountryBasic[]> => request('api/locations/countries/')
);

export const fetchCountriesGeometryFx = createEffect(
  async (): Promise<CountryGeometry[]> =>
    request('api/locations/countries-boundary/')
);

export const fetchGlobalStatsFx = createEffect(
  async (): Promise<GlobalStats> => request('api/statistics/global-stat/')
);
