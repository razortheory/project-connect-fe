import React from 'react';

import { router } from '~/core/routes';

export const Logo = () => (
  <button
    type="button"
    onClick={() => router.navigate('/')}
    className="header__logo logo"
  >
    Project connect
  </button>
);
