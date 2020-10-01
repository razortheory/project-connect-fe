import { ConnectivityStatus } from '~/api/types';

export const getPopupClassName = (
  connectivityStatus: ConnectivityStatus
): string => {
  switch (connectivityStatus) {
    case 'no':
      return 'school-popup--no-connectivity';
    case 'moderate':
      return 'school-popup--moderate';
    case 'good':
      return 'school-popup--good';
    case 'unknown':
    default:
      return 'school-popup--unavailable';
  }
};
