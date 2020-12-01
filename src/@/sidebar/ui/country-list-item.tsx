import clsx from 'clsx';
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
      className={clsx('list__item', {
        'list__item--disabled':
          country.integration_status === 0 || country.integration_status === 4,
      })}
    >
      <span
        className="list__circle"
        style={{
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          backgroundColor: paintData[paintField]?.toString(),
        }}
      />
      <Link
        className="list__link"
        to={mapCountry}
        params={{ code: country.code.toLowerCase() }}
        // Handle click event before blur
        onMouseDown={() =>
          mapCountry.navigate({ code: country.code.toLowerCase() })
        }
      >
        {country.name}
      </Link>
    </li>
  );
};
