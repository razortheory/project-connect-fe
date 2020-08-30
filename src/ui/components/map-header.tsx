import React from 'react';

import { router } from '~/core/routes';
import { Button, Logo } from '~/ui/atoms';

export const MapHeader = () => (
  <header className="header">
    <div className="container">
      <Logo />
      <Button onClick={() => router.navigate('/media')}>Project info</Button>
    </div>
  </header>
);
