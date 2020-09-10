import React from 'react';

import { mapCountries } from '~/core/routes';
import { Link } from '~/lib/router';

export const MapOverview = () => (
  <>
    <h2 className="sidebar__title">
      Connecting every young person to information, opportunity and choice.
    </h2>
    <div className="sidebar__content">
      <p className="sidebar__paragraph">
        Project Connect aims to map real-time connectivity of every school in
        the world. This will serve as foundation to work with governments and
        service providers to connect every school to the internet.
      </p>
      <ul className="sidebar__list info-list">
        <li className="info-list__item">
          <p className="info-list__description">0.8M / 6M</p>
          <h3 className="info-list__title">Schools mapped</h3>
        </li>
        <li className="info-list__item">
          <p className="info-list__description">87%</p>
          <h3 className="info-list__title">Schools without connectivity</h3>
        </li>
        <li className="info-list__item">
          <p className="info-list__description">43</p>
          <h3 className="info-list__title">Countries joined Project Connect</h3>
        </li>
      </ul>
      <Link to={mapCountries} className="button button--primary">
        Select a country
      </Link>
    </div>
  </>
);
