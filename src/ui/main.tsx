import React from 'react';

import { Children } from '~/lib/types';

export const Main = ({ children }: Children) => (
  <main className="content">{children}</main>
);
