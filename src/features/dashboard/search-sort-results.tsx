import { useStore } from 'effector-react';
import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { mapCountry } from '~/core/routes';
import { CountryData } from '~/features/map/types';
import { Link } from '~/lib/router';

import { getCountryInfo } from './dashboard-helpers';
import { $isListType, $noSearchResults, $searchResults } from './model';

export const NotFound = () => <h1>Countries not found</h1>;

export const CountriesFound = () => {
  const searchResults = useStore($searchResults);
  const isListType = useStore($isListType);

  return (
    <div className="countries-list__row">
      {searchResults?.map((country: CountryData) => {
        const {
          id,
          name,
          flag,
          joinDate,
          description,
          progressPercent,
          progressBarStyle,
          mapPreviewStyle,
          bubbleProgressClass,
          progressDescription,
        } = getCountryInfo(country, isListType);

        return (
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
                    {progressPercent}%
                  </div>
                </div>

                <div className="country__separator" />

                <p className="country__description">{description}</p>

                <Link
                  className="country__view-on-map view-on-map"
                  to={mapCountry}
                  params={{ id }}
                >
                  <div
                    className="country__view-on-map view-on-map"
                    style={mapPreviewStyle}
                  />
                </Link>

                <div className="country__link">
                  <Chevron alt="View in map" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SearchResults = () => (
  <>{useStore($noSearchResults) ? <NotFound /> : <CountriesFound />}</>
);
