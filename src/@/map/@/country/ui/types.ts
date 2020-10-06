import { ConnectivityStatus, CoverageStatus } from '~/api/types';

export type SchoolInfo = {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  gpsConfidence: string | null;
  connectivityStatus: ConnectivityStatus;
  connectionSpeed: string;
  connectivityType: string;
  latitude: number;
  longitude: number;
  coverageNetwork: string;
  coverageStatus: CoverageStatus;
  regionClassification: string;
};
