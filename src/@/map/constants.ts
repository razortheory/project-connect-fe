import { Expression } from 'mapbox-gl';

import { GlobalStats, IntegrationStatus } from '~/api/types';

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
    countryNotVerified: '#4b505a',
    countryWithOSM: '#373c46',
    countryVerified: '#8945d4',
    countryWithConnectivity: '#0068ea',
    countrySelected: '#141923',
    countryNotSelected: '#373c46',
    opacity: 0.7,
    opacityHover: 0.8,
    selectedCountryOpacity: 0.7,
    schoolsNotVerified: '#ffffff',
    schoolsVerified: '#ffffff',
    schoolsWithConnectivity: '#ffffff',
    schoolConnectivity: {
      unknown: '#546fc2',
      no: '#ff615b',
      moderate: '#ffc93d',
      good: '#8bd432',
      notVerified: '#546fc2',
    },
  },
  light: {
    background: '#646973',
    countryNotVerified: '#a9adb6',
    countryWithOSM: '#E7EBF4',
    countryVerified: '#e1d0f4',
    countryWithConnectivity: '#c4dcfa',
    countrySelected: '#ffffff',
    countryNotSelected: '#a9adb6',
    opacity: 0.7,
    opacityHover: 0.8,
    selectedCountryOpacity: 0.7,
    schoolsNotVerified: '#6e737d',
    schoolsVerified: '#8945d4',
    schoolsWithConnectivity: '#0068ea',
    schoolConnectivity: {
      unknown: '#546fc2',
      no: '#ff615b',
      moderate: '#ffc93d',
      good: '#8bd432',
      notVerified: '#546fc2',
    },
  },
  satellite: {
    background: '#000',
    countryNotVerified: '#ffffff',
    countryWithOSM: '#373c46',
    countryVerified: '#8945d4',
    countryWithConnectivity: '#0068ea',
    countrySelected: '#ffffff',
    countryNotSelected: '#ffffff',
    opacity: 0.7,
    opacityHover: 0.8,
    selectedCountryOpacity: 0,
    schoolsNotVerified: '#ffffff',
    schoolsVerified: '#ffffff',
    schoolsWithConnectivity: '#ffffff',
    schoolConnectivity: {
      unknown: '#546fc2',
      no: '#ff615b',
      moderate: '#ffc93d',
      good: '#8bd432',
      notVerified: '#546fc2',
    },
  },
  accessible: {
    background: '#646973',
    countryNotVerified: '#4b505a',
    countryWithOSM: '#373c46',
    countryVerified: '#f5793a',
    countryWithConnectivity: '#63acbe',
    countrySelected: '#141923',
    countryNotSelected: '#373c46',
    opacity: 0.7,
    opacityHover: 0.8,
    selectedCountryOpacity: 0.7,
    schoolsNotVerified: '#ffffff',
    schoolsVerified: '#ffffff',
    schoolsWithConnectivity: '#ffffff',

    schoolConnectivity: {
      unknown: '#a95aa1',
      no: '#f5793a',
      moderate: '#85c0f9',
      good: '#ffffff',
      notVerified: '#a95aa1',
    },
  },
};

export const getDefaultCountryOpacity = (
  paintData: StylePaintData
): Expression => [
  'case',
  ['boolean', ['feature-state', 'hover'], false],
  paintData.opacityHover,
  paintData.opacity,
];

export const getDefaultCountryColor = (
  paintData: StylePaintData
): Expression => [
  'match',
  ['get', 'integration_status'],
  0,
  paintData.countryNotVerified,
  1,
  paintData.countryVerified,
  2,
  paintData.countryWithConnectivity,
  3,
  paintData.countryWithConnectivity,
  4,
  paintData.countryNotVerified,
  5,
  paintData.countryWithOSM,
  paintData.countryNotVerified,
];

export const getGlobalSchoolsColor = (
  paintData: StylePaintData
): Expression => [
  'match',
  ['get', 'country_integration_status'],
  0,
  paintData.schoolsNotVerified,
  1,
  paintData.schoolsVerified,
  2,
  paintData.schoolsWithConnectivity,
  3,
  paintData.schoolsWithConnectivity,
  paintData.schoolsNotVerified,
];

export const statusPaintField: {
  [key in IntegrationStatus]: keyof StylePaintData;
} = {
  0: 'countryNotVerified',
  1: 'countryVerified',
  2: 'countryWithConnectivity',
  3: 'countryWithConnectivity',
  4: 'countryNotVerified',
  5: 'countryWithOSM',
};

export const defaultGlobalStats: GlobalStats = {
  total_schools: 0,
  schools_mapped: 0,
  countries_joined: 0,
  countries_with_static_data: 0,
  countries_connected_to_realtime: 0,
  percent_schools_without_connectivity: 0,
  last_date_updated: null,
};

export const mapCircleSizes = [
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1.5],
  [7, 2],
  [8, 2.5],
  [9, 3],
  [10, 4.5],
  [11, 6],
  [12, 7.5],
  [13, 9],
  [14, 10.5],
  [15, 12],
  [16, 13.5],
  [17, 13.5],
  [18, 15],
  [19, 15],
  [20, 15],
  [21, 15],
  [22, 15],
];
