import { createRouter, history } from '~/lib/router';

// Create router and use Browser History
export const router = createRouter({ history });

// This route is only for redirection
export const exactRoot = router.add({ path: '/' });

type Code = { code: string };

// Map section
export const map = router.add('/map:path(/.*)?');
export const mapOverview = router.add('/map');
export const mapCountries = router.add('/map/countries:path(/.*)?');
export const mapCountry = router.add<Code>('/map/country/:code:path(/.*)?');
export const mapCountriesList = router.add('/map/countries/list');
export const mapCountryInfo = router.add<Code>('/map/country/:code/info');

// Project section
export const media = router.add('/media');
export const countryProgress = router.add('/country-progress');
export const joinUs = router.add('/join-us');
export const about = router.add('/about');
export const privacy = router.add('/privacy');

// Merge route to create parent route
export const project = router.merge([
  media,
  countryProgress,
  joinUs,
  about,
  privacy,
]);

// Redirect from "/" to "/map"
exactRoot.visible.watch((visible) => {
  if (visible) {
    map.redirect();
  }
});
