import React from 'react';

import { Children } from '~/lib/types';

export const Button = ({ children }: Children) => (
  <button type="button" className="button button--primary">
    {children}
  </button>
);
