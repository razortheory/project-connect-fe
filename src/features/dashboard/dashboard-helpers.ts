/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/naming-convention */
import { format } from 'date-fns';

import MapPreview from '~/assets/images/preview-placeholder.jpg';
import { getReadablePercent } from '~/core/helpers';
import { CountryData } from '~/features/map';

import { DashboardCountryData } from './types';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.';

export const getCountryInfo = (
  country: CountryData,
  isListType: boolean
): DashboardCountryData => {
  const {
    id,
    flag,
    name,
    description,
    date_of_join,
    map_preview,
    integration_status,
    schools_with_data_percentage,
  } = country;

  const joinDate = new Date(date_of_join as string);
  const dateFormat = isListType
    ? format(new Date(joinDate), 'd LLL yyyy')
    : format(new Date(joinDate), 'LLL yyyy');
  const readableDate = `${isListType ? '' : 'Joined in '}${dateFormat}`;

  const progressPercent = getReadablePercent(
    Number(schools_with_data_percentage),
    1
  );

  const progressInfo = new Map([
    [
      0,
      {
        bubbleProgressClass: 'joined',
        progressDescription: 'Country joined Project Connect',
      },
    ],
    [
      1,
      {
        bubbleProgressClass: 'locations-mapped',
        progressDescription: 'School locations mapped',
      },
    ],
    [
      2,
      {
        bubbleProgressClass: 'connectivity-mapped',
        progressDescription: 'Static connectivity mapped',
      },
    ],
    [
      3,
      {
        bubbleProgressClass: 'real-time-data',
        progressDescription: 'Real time connectivity mapped',
      },
    ],
  ]);

  return {
    id,
    flag,
    name,
    joinDate: readableDate,
    description: description || loremIpsum,
    progressPercent,
    progressBarStyle: {
      width: `${progressPercent || '0'}%`,
    },
    bubbleProgressClass: '',
    progressDescription: '',
    mapPreviewStyle: {
      backgroundImage: `url(${map_preview || MapPreview})`,
    },
    ...progressInfo.get(integration_status),
  };
};
