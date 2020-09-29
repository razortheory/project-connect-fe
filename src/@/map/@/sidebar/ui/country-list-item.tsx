import { useStore } from 'effector-react';
import React from 'react';

import { CountryBasic } from '~/api/types';
import { mapCountry } from '~/core/routes';
import { Link } from '~/lib/router';

import { statusPaintField } from '@/map/constants';
import { $stylePaintData } from '@/map/model';

export const CountryListItem = ({ country }: { country: CountryBasic }) => {
  const paintData = useStore($stylePaintData);
  const paintField = statusPaintField[country.integration_status];

  return (
    <li
      className={`list__item ${
        country.integration_status === 0 ? 'list__item--disabled' : ''
      }`}
    >
      <span
        className="list__circle"
        style={{
          backgroundColor: paintData[paintField].toString(),
        }}
      />
      <Link
        className="list__link"
        to={mapCountry}
        params={{ code: country.code.toLowerCase() }}
      >
        {country.name}
      </Link>
    </li>
  );
};
