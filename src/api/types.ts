// TODO: Get null from back-end if there is no data

import { Geometry, Point } from 'geojson';

export type ConnectivityStatus = 'no' | 'moderate' | 'good' | 'unknown';
export type CoverageStatus = 'unknown' | 'known';

export type GlobalStats = {
  total_schools: number;
  schools_mapped: number;
  countries_joined: number;
  countries_with_static_data: number;
  countries_connected_to_realtime: number;
  percent_schools_without_connectivity: number;
};

export type IntegrationStatus = 0 | 1 | 2 | 3;

export type CountryBasic = {
  id: number;
  name: string;
  code: string;
  flag: string;
  map_preview: string;
  description: string;
  data_source: string;
  integration_status: IntegrationStatus;
  date_of_join: string;
  schools_with_data_percentage: number;
  schools_total: number;
};

export type Country = {
  id: number;
  name: string;
  code: string;
  flag: string;
  map_preview: string;
  description: string;
  data_source: string;
  statistics: CountryStatistics;
  geometry: Geometry;
};

export type CountryStatistics = {
  schools_total: number;
  schools_connected: number;
  schools_connectivity_unknown: number;
  schools_connectivity_no: number;
  schools_connectivity_moderate: number;
  schools_connectivity_good: number;
  connectivity_speed: number;
  integration_status: number;
  avg_distance_school: number;
  created: string;
  modified: string;
};

export type CountryGeometry = {
  id: number;
  geometry_simplified: Geometry;
};

export type SchoolBasic = {
  id: number;
  name: string;
  geopoint: Geometry;
  connectivity_status: ConnectivityStatus;
  coverage_status: CoverageStatus;
};

export type School = {
  // TODO: Add coverage_status on back-end
  id: number;
  name: string;
  geopoint: Point;
  statistics: {
    num_students: number;
    num_teachers: number;
    num_classroom: number;
    num_latrines: number;
    running_water: boolean;
    electricity_availability: boolean;
    computer_lab: boolean;
    num_computers: number;
    connectivity: boolean;
    connectivity_status: ConnectivityStatus;
    connectivity_type: string;
    connectivity_speed: number;
    connectivity_latency: number;
    connectivity_availability: number;
    created: string;
    modified: string;
  };
  gps_confidence: string | null;
  address: string;
  postal_code: string;
};

export type DailyStats = {
  connectivity_latency: number;
  connectivity_speed: number;
  date: string;
  week: number;
  weekday: WeekDay;
  year: number;
};

export type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;
