import { format } from 'date-fns';

import { CountryBasic } from '~/api/types';
import previewPlaceholder from '~/assets/images/preview-placeholder.jpg';
import { formatPercent } from '~/core/formatters';

import { CountryInfo } from '@/project/@/dashboard/types';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.';

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

export const getCountryInfo = (
  country: CountryBasic,
  isListType: boolean
): CountryInfo => {
  const {
    id,
    code,
    flag,
    name,
    description,
    date_of_join: dateOfJoin,
    map_preview: mapPreview,
    integration_status: integrationStatus,
    schools_with_data_percentage: schoolsWithDataPercentage,
  } = country;

  const listDate = dateOfJoin ? format(new Date(dateOfJoin), 'd LLL yyyy') : '';
  const tileDate = dateOfJoin
    ? `Joined in ${format(new Date(dateOfJoin), 'LLL yyyy')}`
    : '';
  const progressPercent = Number(schoolsWithDataPercentage);

  return {
    id,
    code: code.toLowerCase(),
    flag,
    name,
    joinDate: isListType ? listDate : tileDate,
    description: description || loremIpsum,
    progressPercent,
    progressBarStyle: {
      width: formatPercent(progressPercent),
    },
    bubbleProgressClass: '',
    progressDescription: '',
    mapPreviewStyle: {
      backgroundImage: `url(${mapPreview || previewPlaceholder})`,
    },
    ...progressInfo.get(integrationStatus),
  };
};
