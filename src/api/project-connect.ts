import { format, getWeek, getYear, Interval } from 'date-fns';
import { createEffect } from 'effector';
import { FeatureCollection } from 'geojson';

import { API_BASE_URL } from '~/env';
import { createRequest } from '~/lib/request';
import { Controller, createRequestFx } from '~/lib/request-fx';

import { getGlobalSchoolsGeoJson, getSchoolsGeoJson } from '@/country/lib';
// eslint-disable-next-line import/named
import { ApiJoinUsFormFields, JoinUsFormFields } from '@/project/types';

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

const apiBaseUrl = API_BASE_URL;

const request = createRequest({
  baseUrl: apiBaseUrl,
});

export const getDatasetUrl = (countryCode: string): string =>
  `${apiBaseUrl}api/locations/countries/${countryCode}/schools/export-csv-schools/`;

export const fetchCountryFx = createRequestFx(
  async (countryCode: string, controller?: Controller): Promise<Country> =>
    request({
      url: `api/locations/countries/${countryCode}/`,
      signal: controller?.getSignal(),
    })
);

export const fetchSchoolsFx = createRequestFx(
  async (
    countryCode: string,
    controller?: Controller
  ): Promise<FeatureCollection> =>
    request({
      url: `api/locations/countries/${countryCode}/schools/`,
      fn: ({ jsonData }) => getSchoolsGeoJson(jsonData as SchoolBasic[]),
      signal: controller?.getSignal(),
    })
);

export const fetchSchoolFx = createRequestFx(
  async (
    {
      countryCode,
      schoolId,
    }: {
      countryCode: string;
      schoolId: number;
    },
    controller?: Controller
  ): Promise<School> =>
    request({
      url: `api/locations/countries/${countryCode}/schools/${schoolId}/`,
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
      countryCode,
      week,
    }: {
      countryCode: string;
      week: Interval;
    },
    controller?: Controller
  ): Promise<CountryWeeklyStats> => {
    const weekNumber = getWeek(week.start, {
      weekStartsOn: 1,
      firstWeekContainsDate: 4,
    });
    const year = getYear(week.start);
    return request({
      url: `api/statistics/country/${countryCode}/weekly-stat/${year}/${weekNumber}/`,
      signal: controller?.getSignal(),
    });
  }
);

const fetchCountryDailyStats = async (
  {
    countryCode,
    interval,
  }: {
    countryCode: string;
    interval: Interval;
  },
  controller?: Controller
): Promise<DailyStats[] | null> => {
  const startDate = format(interval.start, 'yyyy-MM-dd');
  const endDate = format(interval.end, 'yyyy-MM-dd');

  return request({
    url: `api/statistics/country/${countryCode}/daily-stat/?date__gte=${startDate}&date__lte=${endDate}&page_size=all`,
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
    url: `api/statistics/school/${schoolId}/daily-stat/?date__gte=${startDate}&date__lte=${endDate}&page_size=all`,
    signal: controller?.getSignal(),
  });
};

export const fetchSchoolDailyStatsFx = createRequestFx(fetchSchoolDailyStats);
export const fetchSchoolHistoryFx = createRequestFx(fetchSchoolDailyStats);

export const sendJoinUsFormFx = createRequestFx(
  async (formFields: JoinUsFormFields): Promise<ApiJoinUsFormFields | null> => {
    const { fullName, organization, purpose, yourMessage } = formFields;
    const result = {
      full_name: fullName,
      organisation: organization,
      purpose,
      message: yourMessage,
    };
    return request({
      url: `api/contact/contact/`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
  }
);
