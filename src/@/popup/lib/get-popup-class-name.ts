import { ConnectivityStatus, CoverageStatus } from '~/api/types';

export const getPopupClassName = (
  mapType: string,
  status: ConnectivityStatus | CoverageStatus
): string => {
  if (mapType === 'coverage') {
    switch (status) {
      case 'known':
        return 'school-popup--known';
      case 'unknown':
        return 'school-popup--unknown';
      default:
        return 'school-popup--unknown';
    }
  }

  switch (status) {
    case 'no':
      return 'school-popup--no-connectivity';
    case 'moderate':
      return 'school-popup--moderate';
    case 'good':
      return 'school-popup--good';
    case 'unknown':
      return 'school-popup--unavailable';
    default:
      return 'school-popup--unavailable';
  }
};
