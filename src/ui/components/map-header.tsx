import React from 'react';

import { navigate } from '~/lib/router';
import { Button, Logo } from '~/ui/atoms';

export const MapHeader = () => (
  <header className="header">
    <div className="container-fluid">
      <Logo />
      <Button onClick={() => navigate('/media')}>Project info</Button>
    </div>
  </header>
);
