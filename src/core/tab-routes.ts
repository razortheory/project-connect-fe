import { createRouter } from '~/lib/router';

// Create countries tab router
export const tabRouter = createRouter({
  root: '/info',
});

// Map section
export const tabMap = tabRouter.add('/map');
export const tabInfo = tabRouter.add('/info');
export const tabControls = tabRouter.add('/controls');
export const tabSort = tabRouter.add('/sort');
