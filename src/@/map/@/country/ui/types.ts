import { ConnectivityStatus } from '~/api/types';

export type SchoolInfo = {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  gpsConfidence: string | null;
  connectivityStatus: ConnectivityStatus;
  connectivitySpeed: string;
  connectivityType: string;
  latitude: number;
  longitude: number;
  coverage: string;
  region: string;
};
