import { useStore } from 'effector-react';
import React from 'react';

import { CountryBasic } from '~/api/types';
import { formatPercent } from '~/core/formatters';
import { mapCountry } from '~/core/routes';
import { Link } from '~/lib/router';

import {
  $countriesList,
  $dashboardCountryId,
  $isListType,
} from '@/dashboard/model';

import { getCountryInfo } from './get-country-info';

export const CountryPopupDetails = () => {
  const isListType = useStore($isListType);
  const dashboardCountryId = useStore($dashboardCountryId);
  const countriesList = useStore($countriesList);
  const selectedPopupCountry = countriesList.find(
    (data) => data.id === dashboardCountryId
  );

  const {
    code,
    flag,
    name,
    joinDate,
    progressPercent,
    progressBarStyle,
    mapPreviewStyle,
    bubbleProgressClass,
    progressDescription,
  } = getCountryInfo(selectedPopupCountry as CountryBasic, isListType);

  return (
    <div className="country">
      <div className="country__meta-wrapper">
        <div className="country__flag-wrapper">
          <img className="country__flag" src={flag} alt={`${name}-flag`} />
        </div>

        <div className="country__info-wrapper">
          <h3 className="country__name">{name}</h3>
          <div className="country__date">{joinDate}</div>
        </div>
      </div>

      <div className="country__progress country-progress">
        <h4 className="country__subtitle">Progress</h4>
        <div
          className={`country-progress__bubbles country-progress__bubbles--${bubbleProgressClass}`}
        >
          <div className="country-progress__bubble" />
          <div className="country-progress__bubble" />
          <div className="country-progress__bubble" />
          <div className="country-progress__bubble" />
        </div>

        <h5 className="country-progress__title">{progressDescription}</h5>
      </div>

      <div className="country__schools-connectivity schools-connectivity">
        <h4 className="country__subtitle">Schools with connectivity</h4>
        {progressPercent ? (
          <div className="schools-connectivity__bar">
            <div
              className="schools-connectivity__filler"
              style={progressBarStyle}
            />
          </div>
        ) : null}

        <div className="schools-connectivity__percentage-connected">
          {progressPercent ? formatPercent(progressPercent) : 'No data'}
        </div>
      </div>

      <div className="country__separator" />

      <div className="country__view-on-map view-on-map" style={mapPreviewStyle}>
        <Link to={mapCountry} params={{ code }}>
          <button type="button" className="button button--primary">
            View map
          </button>
        </Link>
      </div>
    </div>
  );
};
