import mapboxGl, { MapMouseEvent } from 'mapbox-gl';

import { ConnectionStatus } from '~/api/types';

import { Map } from '@/map/types';

export type SchoolInfo = {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  gpsConfidence: string | null;
  connectivityStatus: ConnectionStatus;
  connectionSpeed: string;
  connectivityType: string;
  latitude: number;
  longitude: number;
  networkCoverage: string;
  coverageType: string;
  regionClassification: string;
  connectivity: boolean | null;
  coverageStatus: ConnectionStatus;
};

export type AddSchoolPopup = {
  map: Map | null;
  popup: mapboxGl.Popup | null;
  event: MapMouseEvent;
};
