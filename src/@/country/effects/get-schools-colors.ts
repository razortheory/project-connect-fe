import { Expression, StyleFunction } from 'mapbox-gl';

import { connectivityStatusPaintData } from '@/map/constants';
import { MapType } from '@/map/types';

type GetSchoolsColors = {
  mapType: MapType;
  hasConnectivityStatus: boolean;
  hasCoverageType: boolean;
};

const getColorExpression = (property: string): Expression => {
  return [
    'match',
    ['get', property],
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
};

export const getSchoolsColors = ({
  mapType,
  hasConnectivityStatus,
  hasCoverageType,
}: GetSchoolsColors): string | StyleFunction | Expression | undefined => {
  if (mapType === 'connectivity') {
    return getColorExpression(
      hasConnectivityStatus ? 'connectivity_status' : 'connectivity'
    );
  }

  if (mapType === 'coverage') {
    return getColorExpression(
      hasCoverageType ? 'coverage_type' : 'coverage_availability'
    );
  }

  return '#ffffff';
};
