import { Expression, StyleFunction } from 'mapbox-gl';

import { MapType, StylePaintData } from '@/map/types';

type GetSchoolsColors = {
  mapType: MapType;
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
    'notVerified',
    paintData.schoolConnectivity.notVerified,
    paintData.schoolConnectivity.unknown,
  ];
};

export const getSchoolsColors = ({
  mapType,
  paintData,
}: GetSchoolsColors): string | StyleFunction | Expression | undefined => {
  if (mapType === 'connectivity') {
    return getColorExpression('connectivity_status', paintData);
  }

  if (mapType === 'coverage') {
    return getColorExpression('coverage_status', paintData);
  }

  return '#ffffff';
};
