import React from 'react';

import { media } from '~/core/routes';
import { Link } from '~/lib/router';
import { Button, Logo } from '~/ui/atoms';

export const MapHeader = () => (
  <header className="header">
    <div className="container-fluid">
      <Logo />
      <Link to={media} className="header__button">
        <Button>Project info</Button>
      </Link>
    </div>
  </header>
);
