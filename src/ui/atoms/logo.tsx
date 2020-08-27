import React from 'react';

import { navigate } from '~/lib/router';

export const Logo = () => (
  <button
    type="button"
    onClick={() => navigate('/')}
    className="header__logo logo"
  >
    Project connect
  </button>
);
