import { createRoute } from '~/lib/router';

export const root = createRoute({ path: '/', exact: true, redirectTo: '/map' });

export const map = createRoute({ path: '/map' });
export const mapOverview = createRoute({ path: '/map', exact: true });
export const mapCountries = createRoute({ path: '/map/countries' });
export const mapCountry = createRoute({ path: '/map/country/:id' });

export const project = createRoute();
export const media = createRoute({ path: '/media', parent: project });
export const countryProgress = createRoute({
  path: '/country-progress',
  parent: project,
});
export const joinUs = createRoute({
  path: '/join-us',
  parent: project,
});
export const about = createRoute({
  path: '/about',
  parent: project,
});
export const privacy = createRoute({
  path: '/privacy',
  parent: project,
});
