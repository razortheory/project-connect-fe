import { Geometry } from 'geojson';

export type ConnectivityStatus = 'no' | 'unknown' | 'moderate' | 'good';
// TODO change the coverage status options when they are known
export type CoverageStatus = 'unknown' | 'known';

export type GlobalStatsData = {
  total_schools: number;
  schools_mapped: number;
  countries_joined: number;
  countries_with_static_data: number;
  countries_connected_to_realtime: number;
  percent_schools_without_connectivity: number;
};

export type IntegrationStatus = 0 | 1 | 2 | 3;

export type CountryMetaData = {
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

export type CountryData = {
  id: number;
  name: string;
  code: string;
  flag: string;
  map_preview: string;
  description: string;
  data_source: string;
  statistics: {
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
  geometry: Geometry;
};

export type CountryGeometryData = {
  id: number;
  geometry_simplified: Geometry;
};

export type SchoolData = {
  id: number;
  name: string;
  geopoint: Geometry;
  connectivity_status: ConnectivityStatus;
  coverage_status: CoverageStatus;
};
