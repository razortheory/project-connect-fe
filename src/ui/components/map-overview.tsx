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
          <h3 className="info-list__title">0.8M / 6M</h3>
          <p className="info-list__description">Schools mapped</p>
        </li>
        <li className="info-list__item">
          <h3 className="info-list__title">87%</h3>
          <p className="info-list__description">Schools without connectivity</p>
        </li>
        <li className="info-list__item">
          <h3 className="info-list__title">43</h3>
          <p className="info-list__description">
            Countries joined Project Connect
          </p>
        </li>
      </ul>
      <Link to={mapCountries} className="button button--primary">
        Select a country
      </Link>
    </div>
  </>
);
