/* eslint-disable @typescript-eslint/naming-convention */
import { useStore } from 'effector-react';
import React from 'react';

import { getReadableCount, getReadablePercent } from '~/core/helpers';
import { mapCountries } from '~/core/routes';
import { $globalStats } from '~/features/map/model';
import { Link } from '~/lib/router';

export const MapOverview = () => {
  const {
    total_schools,
    schools_mapped,
    countries_joined,
    percent_schools_without_connectivity,
  } = useStore($globalStats);

  return (
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
            <p className="info-list__description">
              {getReadableCount(schools_mapped)} /{' '}
              {getReadableCount(total_schools)}
            </p>
            <h3 className="info-list__title">Schools mapped</h3>
          </li>
          <li className="info-list__item">
            <p className="info-list__description">
              {getReadablePercent(percent_schools_without_connectivity, 2)}%
            </p>
            <h3 className="info-list__title">Schools without connectivity</h3>
          </li>
          <li className="info-list__item">
            <p className="info-list__description">{countries_joined}</p>
            <h3 className="info-list__title">
              Countries joined Project Connect
            </h3>
          </li>
        </ul>
        <Link to={mapCountries} className="button button--primary">
          Select a country
        </Link>
      </div>
    </>
  );
};
