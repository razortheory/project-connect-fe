import {
  ConnectivityStatus,
  CoverageStatus,
  GlobalStatsData,
  IntegrationStatus,
} from '~/api/types';

import { Center, MapType, Style, StylePaintData, Zoom } from './types';

export const defaultZoom: Zoom = 2;
export const defaultCenter: Center = [0, 40];
export const defaultStyle: Style = 'dark';
export const defaultMapType: MapType = 'connectivity';

export const styleUrls: { [style in Style]: string } = {
  dark: 'mapbox://styles/ivanrt/ckdk80nes0wb01iqminlchno4',
  light: 'mapbox://styles/ivanrt/ckdzse0bp0r2419lbj96dw07a',
  satellite: 'mapbox://styles/ivanrt/cke2hmks20xc119mpssxyiytb',
  accessible: 'mapbox://styles/ivanrt/cke16a91g0lg41aoz5zk4ddr2',
};

export const styles = Object.keys(styleUrls) as Style[];

export const stylePaintData: { [style in Style]: StylePaintData } = {
  dark: {
    background: '#646973',
    countryNotVerified: '#373c46',
    countryVerified: '#8945d4',
    countryWithConnectivity: '#0068ea',
    countrySelected: '#141923',
    countryNotSelected: '#373c46',
    opacity: 0.7,
    opacityHover: 0.8,
  },
  light: {
    background: '#646973',
    countryNotVerified: '#a9adb6',
    countryVerified: '#e1d0f4',
    countryWithConnectivity: '#c4dcfa',
    countrySelected: '#ffffff',
    countryNotSelected: '#a9adb6',
    opacity: 0.7,
    opacityHover: 0.8,
  },
  satellite: {
    background: '#ffffff',
    countryNotVerified: '#ffffff',
    countryVerified: '#ffffff',
    countryWithConnectivity: '#ffffff',
    countrySelected: '#ffffff',
    countryNotSelected: '#ffffff',
    opacity: 0,
    opacityHover: 0,
  },
  accessible: {
    background: '#646973',
    countryNotVerified: '#373c46',
    countryVerified: '#f5793a',
    countryWithConnectivity: '#63acbe',
    countrySelected: '#141923',
    countryNotSelected: '#373c46',
    opacity: 0.7,
    opacityHover: 0.8,
  },
};

export const statusPaintField: {
  [key in IntegrationStatus]: keyof StylePaintData;
} = {
  0: 'countryNotVerified',
  1: 'countryVerified',
  2: 'countryWithConnectivity',
  3: 'countryWithConnectivity',
};

export const connectivityStatusPaintData: {
  [key in ConnectivityStatus]: string;
} = {
  unknown: '#546fc2',
  no: '#ff615b',
  moderate: '#ffc93d',
  good: '#8bd432',
};

// TODO change the coverage status colors when they are known
export const coverageStatusPaintData: {
  [key in CoverageStatus]: string;
} = {
  known: '#FC7A08',
  unknown: '#7511BF',
};

export const defaultGlobalStats: GlobalStatsData = {
  total_schools: 0,
  schools_mapped: 0,
  countries_joined: 0,
  countries_with_static_data: 0,
  countries_connected_to_realtime: 0,
  percent_schools_without_connectivity: 0,
};
