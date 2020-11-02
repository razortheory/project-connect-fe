import { Expression, StyleFunction } from 'mapbox-gl';

import { MapType, StylePaintData } from '@/map/types';

type GetSchoolsColors = {
  mapType: MapType;
  hasConnectivityStatus: boolean;
  hasCoverageType: boolean;
  paintData: StylePaintData;
};

const getColorExpression = (
  property: string,
  paintData: StylePaintData
): Expression => {
  return [
    'match',
    ['get', property],
    'no',
    paintData.schoolConnectivity.no,
    'unknown',
    paintData.schoolConnectivity.unknown,
    'moderate',
    paintData.schoolConnectivity.moderate,
    'good',
    paintData.schoolConnectivity.good,
    paintData.schoolConnectivity.unknown,
  ];
};

export const getSchoolsColors = ({
  mapType,
  hasConnectivityStatus,
  hasCoverageType,
  paintData,
}: GetSchoolsColors): string | StyleFunction | Expression | undefined => {
  if (mapType === 'connectivity') {
    return getColorExpression(
      hasConnectivityStatus ? 'connectivity_status' : 'connectivity',
      paintData
    );
  }

  if (mapType === 'coverage') {
    return getColorExpression(
      hasCoverageType ? 'coverage_type' : 'coverage_availability',
      paintData
    );
  }

  return '#ffffff';
};
