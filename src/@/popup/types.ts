import mapboxGl, { MapMouseEvent } from 'mapbox-gl';

import {
  Connectivity,
  ConnectivityStatus,
  CoverageAvailability,
  CoverageType,
} from '~/api/types';

import { Map } from '@/map/types';

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
  networkCoverage: string;
  coverageType: CoverageType;
  regionClassification: string;
  connectivity: Connectivity;
  coverageAvailability: CoverageAvailability;
};

export type AddSchoolPopup = {
  map: Map | null;
  popup: mapboxGl.Popup | null;
  event: MapMouseEvent;
};
