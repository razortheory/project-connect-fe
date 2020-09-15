import './update-country';
import './update-schools';
import './remove-country';
import './remove-schools';
import './leave-country-route';

import { combine, forward, guard, sample } from 'effector';

import { mapCountry } from '~/core/routes';
import { $map, $stylePaintData, changeCountryId } from '~/features/map/model';
import { getInverted } from '~/lib/effector-kit';

import { leaveCountryRouteFx, updateCountryFx, updateSchoolsFx } from './model';

const $changeCountryData = combine({
  map: $map,
  paintData: $stylePaintData,
});

// Change country
forward({
  from: sample({
    source: $changeCountryData,
    clock: changeCountryId,
    fn: ({ map, paintData }, countryId) => ({ map, paintData, countryId }),
  }),
  to: [updateCountryFx, updateSchoolsFx],
});

// Leave country route
sample({
  source: $changeCountryData,
  clock: guard(mapCountry.visible, {
    filter: getInverted,
  }),
  target: leaveCountryRouteFx,
});
