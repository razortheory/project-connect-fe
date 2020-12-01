// TODO: Get null from back-end if there is no data

import { Geometry, Point } from 'geojson';

export type ConnectionStatus = 'no' | 'moderate' | 'good' | 'unknown';

export type GlobalStats = {
  total_schools: number;
  schools_mapped: number;
  countries_joined: number;
  countries_with_static_data: number;
  countries_connected_to_realtime: number;
  percent_schools_without_connectivity: number;
  last_date_updated: string | null;
};

export type IntegrationStatus = 0 | 1 | 2 | 3 | 4 | 5;
export type ConnectivityAvailability =
  | 'no_connectivity'
  | 'connectivity'
  | 'static_speed'
  | 'realtime_speed';

export type CoverageAvailability =
  | 'no_coverage'
  | 'coverage_availability'
  | 'coverage_type';

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
  connectivity_availability: ConnectivityAvailability;
  coverage_availability: CoverageAvailability;
  date_schools_mapped: string;
};

export type Country = {
  id: number;
  name: string;
  code: string;
  flag: string;
  map_preview: string;
  description: string;
  data_source: string;
  date_schools_mapped: string;
  statistics: CountryWeeklyStats;
  geometry: Geometry;
};

export type CountryWeeklyStats = {
  schools_total: number;
  schools_connected: number;
  schools_connectivity_unknown: number;
  schools_connectivity_no: number;
  schools_connectivity_moderate: number;
  schools_connectivity_good: number;
  schools_coverage_unknown: number;
  schools_coverage_no: number;
  schools_coverage_moderate: number;
  schools_coverage_good: number;
  connectivity_speed: number;
  integration_status: IntegrationStatus;
  avg_distance_school: number;
  created: string;
  modified: string;
  connectivity_availability: ConnectivityAvailability;
  coverage_availability: CoverageAvailability;
};

export type CountryGeometry = {
  id: number;
  geometry_simplified: Geometry;
};

export type SchoolBasic = {
  id: number;
  name: string;
  geopoint: Geometry;
  connectivity_status: ConnectionStatus;
  coverage_status: ConnectionStatus;
  is_verified: boolean;
};

export type SchoolSimplified = {
  geopoint: Geometry;
  country_id: number;
  country_integration_status: IntegrationStatus;
};

export type School = {
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
    connectivity: boolean | null;
    connectivity_type: string;
    connectivity_speed: number;
    connectivity_latency: number;
    connectivity_availability: number;
    created: string;
    modified: string;
    coverage_type: string;
    coverage_availability: boolean | null;
  };
  gps_confidence: string | null;
  address: string;
  postal_code: string;
  admin_1_name: string;
  admin_2_name: string;
  admin_3_name: string;
  admin_4_name: string;
  timezone: string | null;
  altitude: number;
  email: string | null;
  education_level: string;
  environment: string;
  school_type: string;
  connectivity_status: ConnectionStatus;
  coverage_status: ConnectionStatus;
  is_verified: boolean;
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
