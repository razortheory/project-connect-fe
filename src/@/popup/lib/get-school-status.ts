import {
  Connectivity,
  ConnectivityStatus,
  CoverageAvailability,
  CoverageType,
} from '~/api/types';

import {
  getAliasForCoverageType,
  getStringConnectivity,
} from '@/country/lib/get-schools-data';
import { MapType } from '@/map/types';

type GetPopupClassName = {
  mapType: MapType;
  connectivityStatus: ConnectivityStatus;
  connectivity: Connectivity;
  coverageType: CoverageType;
  coverageAvailability: CoverageAvailability;
  hasConnectivityStatus: boolean;
  hasCoverageType: boolean;
};

export const getSchoolStatus = ({
  mapType,
  connectivityStatus,
  connectivity,
  coverageType,
  coverageAvailability,
  hasConnectivityStatus,
  hasCoverageType,
}: GetPopupClassName): ConnectivityStatus => {
  if (mapType === 'connectivity') {
    return hasConnectivityStatus
      ? connectivityStatus
      : getStringConnectivity(connectivity);
  }
  return hasCoverageType
    ? getAliasForCoverageType(coverageType)
    : getStringConnectivity(coverageAvailability);
};
