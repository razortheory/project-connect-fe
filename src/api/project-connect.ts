import { format, getWeek, getYear, Interval } from 'date-fns';
import { createEffect } from 'effector';
import { FeatureCollection } from 'geojson';

import { createRequest } from '~/lib/request';
import { Controller, createRequestFx } from '~/lib/request-fx';

import { getSchoolsGeoJson } from '@/map/@/country/lib';

import {
  Country,
  CountryBasic,
  CountryGeometry,
  CountryWeeklyStats,
  DailyStats,
  GlobalStats,
  School,
  SchoolBasic,
} from './types';

export const request = createRequest({
  baseUrl: 'https://api.projectconnect.razortheory.com/',
});

export const fetchCountryFx = createRequestFx(
  async (countryId: number, controller?: Controller): Promise<Country> =>
    request({
      url: `api/locations/countries/${countryId}/`,
      signal: await controller?.getSignal(),
    })
);

export const fetchSchoolsFx = createRequestFx(
  async (countryId: number, controller): Promise<FeatureCollection> =>
    request({
      url: `api/locations/countries/${countryId}/schools/`,
      fn: ({ jsonData }) => getSchoolsGeoJson(jsonData as SchoolBasic[]),
      signal: await controller?.getSignal(),
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
      signal: await controller?.getSignal(),
    });
  }
);

const fetchCountryDailyStats = async ({
  countryId,
  interval,
}: {
  countryId: number;
  interval: Interval;
}): Promise<DailyStats[] | null> => {
  const startDate = format(interval.start, 'yyyy-MM-dd');
  const endDate = format(interval.end, 'yyyy-MM-dd');

  return request({
    url: `api/statistics/country/${countryId}/daily-stat/?date__gte=${startDate}&date__lte=${endDate}`,
    fn: ({ jsonData }) => (jsonData as { results: DailyStats[] })?.results,
  });
};

export const fetchCountryDailyStatsFx = createEffect(fetchCountryDailyStats);
export const fetchCountryHistoryFx = createEffect(fetchCountryDailyStats);

const fetchSchoolDailyStats = async ({
  schoolId,
  interval,
}: {
  schoolId: number;
  interval: Interval;
}): Promise<DailyStats[] | null> => {
  const startDate = format(interval.start, 'yyyy-MM-dd');
  const endDate = format(interval.end, 'yyyy-MM-dd');

  return request({
    url: `api/statistics/school/${schoolId}/daily-stat/?date__gte=${startDate}&date__lte=${endDate}`,
    fn: ({ jsonData }) => (jsonData as { results: DailyStats[] })?.results,
  });
};

export const fetchSchoolDailyStatsFx = createEffect(fetchSchoolDailyStats);
export const fetchSchoolHistoryFx = createEffect(fetchSchoolDailyStats);
