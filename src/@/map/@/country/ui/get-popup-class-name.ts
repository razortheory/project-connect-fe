import { ConnectivityStatus } from '~/api/types';

export const getPopupClassName = (
  connectivityStatus: ConnectivityStatus
): string => {
  switch (connectivityStatus) {
    case 'no':
      return 'country-popup--no-connectivity';
    case 'moderate':
      return 'country-popup--moderate';
    case 'good':
      return 'country-popup--good';
    case 'unknown':
    default:
      return 'country-popup--unavailable';
  }
};
