/* eslint-disable @typescript-eslint/naming-convention */

import { useStore } from 'effector-react';
import React from 'react';

import { formatPercent } from '~/core/formatters';
import { mapCountries } from '~/core/routes';
import { humanFormat } from '~/lib/human-format';
import { Link } from '~/lib/router';
import { Button } from '~/ui/atoms';

import { $globalStats } from '@/map/model';
import { Scroll } from '@/scroll';

export const WorldView = () => {
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
      <Scroll>
        <div className="sidebar__content">
          <div className="sidebar__view-connectivity view-connectivity">
            <Link to={mapCountries}>
              <Button>View connectivity map</Button>
            </Link>
          </div>
          <p className="sidebar__paragraph">
            Project Connect aims to map real-time connectivity of every school
            in the world. This will serve as foundation to work with governments
            and service providers to connect every school to the internet.
          </p>
          <ul className="sidebar__list info-list">
            <li className="info-list__item">
              <p className="info-list__description">
                {humanFormat(schools_mapped)} / {humanFormat(total_schools)}
              </p>
              <h3 className="info-list__title">Schools mapped</h3>
            </li>
            <li className="info-list__item">
              <p className="info-list__description">
                {formatPercent(percent_schools_without_connectivity)}
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
          <Link
            to={mapCountries}
            className="sidebar__button sidebar__button--select-country button button--primary"
          >
            Select a country
          </Link>
        </div>
      </Scroll>
    </>
  );
};
