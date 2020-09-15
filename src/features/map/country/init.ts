import './change-country-id';
import './update-country';
import './update-schools';

import { sample } from 'effector';

import { $map, $stylePaintData, changeCountryId } from '~/features/map/model';

import { changeCountryIdFx } from './model';

sample({
  source: {
    map: $map,
    paintData: $stylePaintData,
  },
  clock: changeCountryId,
  fn: ({ map, paintData }, countryId) => ({ map, paintData, countryId }),
  target: changeCountryIdFx,
});
