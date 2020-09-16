import React from 'react';

import { Children } from '~/lib/types';

export const Layout = ({ children }: Children) => (
  <div className="app app--home">{children}</div>
);
