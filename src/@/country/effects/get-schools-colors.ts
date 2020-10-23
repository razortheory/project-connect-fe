import { Expression, StyleFunction } from 'mapbox-gl';

import {
  connectivityStatusPaintData,
  coverageStatusPaintData,
} from '@/map/constants';
import { MapType } from '@/map/types';

export const getSchoolsColors = (
  mapType: MapType
): string | StyleFunction | Expression | undefined => {
  if (mapType === 'connectivity') {
    return [
      'match',
      ['get', 'connectivity_status'],
      'no',
      connectivityStatusPaintData.no,
      'unknown',
      connectivityStatusPaintData.unknown,
      'moderate',
      connectivityStatusPaintData.moderate,
      'good',
      connectivityStatusPaintData.good,
      connectivityStatusPaintData.unknown,
    ];
  }

  if (mapType === 'coverage') {
    return [
      'match',
      ['get', 'coverage_status'],
      'known',
      coverageStatusPaintData.known,
      'unknown',
      coverageStatusPaintData.unknown,
      coverageStatusPaintData.unknown,
    ];
  }

  return '#ffffff';
};
