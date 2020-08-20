import React from 'react';

import { Button, Logo } from '~/ui/atoms';

export const MapHeader = () => (
  <header className="header">
    <div className="container">
      <Logo />
      <Button to="/project">Project info</Button>
    </div>
  </header>
);
