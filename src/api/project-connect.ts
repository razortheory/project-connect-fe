import { format, getWeek, getYear, Interval } from 'date-fns';
import { createEffect } from 'effector';
import { FeatureCollection } from 'geojson';

import { createRequest } from '~/lib/request';
import { Controller, createRequestFx } from '~/lib/request-fx';

import { getGlobalSchoolsGeoJson, getSchoolsGeoJson } from '@/country/lib';

import {
  Country,
  CountryBasic,
  CountryGeometry,
  CountryWeeklyStats,
  DailyStats,
  GlobalStats,
  School,
  SchoolBasic,
  SchoolSimplified,
} from './types';

const apiBaseUrl = 'https://api.projectconnect.razortheory.com/';

const request = createRequest({
  baseUrl: apiBaseUrl,
});

export const getDatasetUrl = (countryId: number): string =>
  `${apiBaseUrl}api/locations/countries/${countryId}/schools/export-csv-schools/`;

export const fetchCountryFx = createRequestFx(
  async (countryId: number, controller?: Controller): Promise<Country> =>
    request({
      url: `api/locations/countries/${countryId}/`,
      signal: controller?.getSignal(),
    })
);

export const fetchSchoolsFx = createRequestFx(
  async (
    countryId: number,
    controller?: Controller
  ): Promise<FeatureCollection> =>
    request({
      url: `api/locations/countries/${countryId}/schools/`,
      fn: ({ jsonData }) => getSchoolsGeoJson(jsonData as SchoolBasic[]),
      signal: controller?.getSignal(),
    })
);

export const fetchSchoolFx = createRequestFx(
  async (
    {
      countryId,
      schoolId,
    }: {
      countryId: number;
      schoolId: number;
    },
    controller?: Controller
  ): Promise<School> =>
    request({
      url: `api/locations/countries/${countryId}/schools/${schoolId}/`,
      signal: controller?.getSignal(),
    })
);

export const fetchCountriesFx = createEffect(
  async (): Promise<CountryBasic[]> => request('api/locations/countries/')
);

export const fetchCountriesGeometryFx = createEffect(
  async (): Promise<CountryGeometry[]> =>
    request('api/locations/countries-boundary/')
);

export const fetchSchoolsGlobal = createEffect(
  async (): Promise<FeatureCollection> =>
    request({
      url: 'api/locations/schools/random/',
      fn: ({ jsonData }) =>
        getGlobalSchoolsGeoJson(jsonData as SchoolSimplified[]),
    })
);

export const fetchGlobalStatsFx = createEffect(
  async (): Promise<GlobalStats> => request('api/statistics/global-stat/')
);

export const fetchCountryWeeklyStatsFx = createRequestFx(
  async (
    {
      countryId,
      week,
    }: {
      countryId: number;
      week: Interval;
    },
    controller?: Controller
  ): Promise<CountryWeeklyStats> => {
    const weekNumber = getWeek(week.start);
    const year = getYear(week.start);
    return request({
      url: `api/statistics/country/${countryId}/weekly-stat/${year}/${weekNumber}/`,
      signal: controller?.getSignal(),
    });
  }
);

const fetchCountryDailyStats = async (
  {
    countryId,
    interval,
  }: {
    countryId: number;
    interval: Interval;
  },
  controller?: Controller
): Promise<DailyStats[] | null> => {
  const startDate = format(interval.start, 'yyyy-MM-dd');
  const endDate = format(interval.end, 'yyyy-MM-dd');

  return request({
    url: `api/statistics/country/${countryId}/daily-stat/?date__gte=${startDate}&date__lte=${endDate}`,
    fn: ({ jsonData }) => (jsonData as { results: DailyStats[] })?.results,
    signal: controller?.getSignal(),
  });
};

export const fetchCountryDailyStatsFx = createRequestFx(fetchCountryDailyStats);
export const fetchCountryHistoryFx = createRequestFx(fetchCountryDailyStats);

const fetchSchoolDailyStats = async (
  {
    schoolId,
    interval,
  }: {
    schoolId: number;
    interval: Interval;
  },
  controller?: Controller
): Promise<DailyStats[] | null> => {
  const startDate = format(interval.start, 'yyyy-MM-dd');
  const endDate = format(interval.end, 'yyyy-MM-dd');

  return request({
    url: `api/statistics/school/${schoolId}/daily-stat/?date__gte=${startDate}&date__lte=${endDate}`,
    fn: ({ jsonData }) => (jsonData as { results: DailyStats[] })?.results,
    signal: controller?.getSignal(),
  });
};

export const fetchSchoolDailyStatsFx = createRequestFx(fetchSchoolDailyStats);
export const fetchSchoolHistoryFx = createRequestFx(fetchSchoolDailyStats);
