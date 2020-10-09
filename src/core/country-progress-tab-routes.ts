import { createRouter } from '~/lib/router';

import { countryProgress } from './routes';

export const countryProgressTabRouter = createRouter({
  root: '/country-progress',
});

export const countryProgressTabCountries = countryProgressTabRouter.add(
  '/countries'
);
export const countryProgressTabSort = countryProgressTabRouter.add('/sort');

countryProgress.visible.watch(
  (visible) => visible && countryProgressTabCountries.navigate()
);
