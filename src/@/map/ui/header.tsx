import React from 'react';

import { about } from '~/core/routes';
import { Link } from '~/lib/router';
import { Button, Logo } from '~/ui/atoms';

export const Header = () => (
  <header className="header">
    <div className="container-fluid">
      <Logo />
      <Link to={about} className="header__button button button--primary">
        Project info
      </Link>
    </div>
  </header>
);
