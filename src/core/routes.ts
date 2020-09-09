import { router, tabRouter } from './router';

// This route is only for redirection
export const exactRoot = router.add({ path: '/' });

// Map section
export const map = router.add('/map(/.*)?');
export const mapOverview = router.add('/map');
export const mapCountries = router
  .add<{ tab: string }>('/map/countries:tab(;tab=.*)?')
  .bind('tab', {
    router: tabRouter,
    parse: (rawParam) => rawParam?.replace(/;tab=/g, ''),
    format: (path) => path && `;tab=${path}`,
  });
export const mapCountry = router.add<{ id: number }>('/map/country/:id');

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
