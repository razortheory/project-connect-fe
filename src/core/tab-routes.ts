/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createEvent, sample } from 'effector';

import { createRouter } from '~/lib/router';

import {
  mapCountries,
  mapCountriesList,
  mapCountry,
  mapCountryInfo,
} from './routes';

// Create countries tab router
export const tabRouter = createRouter({
  root: '/map',
});

// Map section
export const tabMap = tabRouter.add('/map');
export const tabInfo = tabRouter.add('/info');
export const tabControls = tabRouter.add('/controls');
export const tabSort = tabRouter.add('/sort');

// Navigate to tab info
mapCountriesList.visible.watch((visible) => visible && tabInfo.navigate());
mapCountryInfo.visible.watch((visible) => visible && tabInfo.navigate());

// Navigate from tab info
const onTabInfo = createEvent();
tabInfo.visible.watch((visible) => visible && onTabInfo());

sample([mapCountry.visible, mapCountry.params], onTabInfo).watch(
  ([visible, params]) => visible && mapCountryInfo.navigate(params!)
);

sample(mapCountries.visible, onTabInfo).watch(
  (visible) => visible && mapCountriesList.navigate()
);

// Navigate from tab map
const onTabMap = createEvent();
tabMap.visible.watch((visible) => visible && onTabMap());

sample([mapCountry.visible, mapCountry.params], onTabMap).watch(
  ([visible, params]) => visible && mapCountry.navigate({ code: params!.code })
);

sample(mapCountries.visible, onTabMap).watch(
  (visible) => visible && mapCountries.navigate()
);
