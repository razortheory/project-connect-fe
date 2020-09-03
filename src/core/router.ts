import history from 'history/browser';

import { createRouter } from '~/lib/router';

// Create router and use Browser History
export const router = createRouter({ history });

// Create countries tab router
export const tabRouter = createRouter({
  root: '/info',
});
