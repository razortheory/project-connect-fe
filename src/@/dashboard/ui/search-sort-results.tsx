import { useList, useStore } from 'effector-react';
import React from 'react';

import { CountryBasic } from '~/api/types';
import Chevron from '~/assets/images/chevron.svg';
import { formatPercent } from '~/core/formatters';
import { mapCountry } from '~/core/routes';
import { getInverted } from '~/lib/effector-kit';
import { Link } from '~/lib/router';
import { Button } from '~/ui';

import { $isTablet } from '~/core/media-query';
import {
  $countriesList,
  $dashboardCountryId,
  $isListType,
  $isPopupOpen,
  $noSearchResults,
  changeDashboardCountryId,
  changePopupStatus,
} from '@/dashboard/model';

import { getCountryInfo } from './get-country-info';

export const NotFound = () => <h1>Countries not found</h1>;
// View
const onChangeView = changePopupStatus.prepend(getInverted);

export const CountryList = () => {
  const isListType = useStore($isListType);
  const isTablet = useStore($isTablet);

  return (
    <div className="countries-list__row">
      {useList($countriesList, (countryBasic: CountryBasic) => {
        const {
          id,
          code,
          flag,
          name,
          joinDate,
          description,
          progressPercent,
          progressBarStyle,
          mapPreviewStyle,
          bubbleProgressClass,
          progressDescription,
        } = getCountryInfo(countryBasic, isListType);

        return isTablet ? (
          <button
            onClick={() => {
              onChangeView(true);
              changeDashboardCountryId(id);
            }}
            type="button"
            className="popup-country__button"
          >
            <div className="countries-list__item" key={id}>
              <div className="country">
                <div className="country__inner">
                  <div className="country__meta-wrapper">
                    <h3 className="country__name">{name}</h3>
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
                  </div>

                  <div className="country__link">
                    <Chevron alt="View in map" />
                  </div>
                </div>
              </div>
            </div>
          </button>
        ) : (
          <div className="countries-list__item" key={id}>
            <div className="country">
              <div className="country__inner">
                <div className="country__meta-wrapper">
                  <div className="country__flag-wrapper">
                    <img
                      className="country__flag"
                      src={flag}
                      alt={`${name}-flag`}
                    />
                  </div>

                  <h3 className="country__name">{name}</h3>

                  <div className="country__date">{joinDate}</div>
                </div>

                <div className="country__connectivity-and-progress">
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

                    <h5 className="country-progress__title">
                      {progressDescription}
                    </h5>
                  </div>

                  <div className="country__schools-connectivity schools-connectivity">
                    <h4 className="country__subtitle">
                      Schools with connectivity
                    </h4>
                    <div className="schools-connectivity__bar">
                      <div
                        className="schools-connectivity__filler"
                        style={progressBarStyle}
                      />
                    </div>

                    <div className="schools-connectivity__percentage-connected">
                      {formatPercent(progressPercent)}
                    </div>
                  </div>
                </div>

                <div className="country__separator" />

                <p className="country__description">{description}</p>

                <Link
                  className="country__view-on-map view-on-map"
                  to={mapCountry}
                  params={{ code }}
                  style={mapPreviewStyle}
                >
                  <div className="view-on-map__link">
                    View schools on map
                    <Chevron />
                  </div>
                  <Button>View map</Button>
                </Link>

                <Link
                  className="country__link"
                  to={mapCountry}
                  params={{ code }}
                >
                  <Chevron alt="View in map" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

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
    description,
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
        <div className="schools-connectivity__bar">
          <div
            className="schools-connectivity__filler"
            style={progressBarStyle}
          />
        </div>

        <div className="schools-connectivity__percentage-connected">
          {formatPercent(progressPercent)}
        </div>
      </div>

      <div className="country__separator" />

      <p className="country__description">{description}</p>

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

const CountriesFound = () => {
  const isPopupOpen = useStore($isPopupOpen);

  return isPopupOpen ? (
    <div className="popup-country__container">
      <button
        type="button"
        onClick={onChangeView}
        className="popup-country__button popup-country__close-button"
      >
        ×
      </button>
      <CountryPopupDetails />
    </div>
  ) : (
    <CountryList />
  );
};

export const SearchResults = () => (
  <>{useStore($noSearchResults) ? <NotFound /> : <CountriesFound />}</>
);
