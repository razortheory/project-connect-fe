import { useList, useStore } from 'effector-react';
import React from 'react';

import { CountryMetaData } from '~/api/types';
import Chevron from '~/assets/images/chevron.svg';
import { formatPercent } from '~/core/formatters';
import { mapCountry } from '~/core/routes';
import { Link } from '~/lib/router';

import { getCountryInfo } from '@/project/@/dashboard/lib/get-country-info';
import {
  $countries,
  $isListType,
  $notFound,
} from '@/project/@/dashboard/model';

export const NotFound = () => <h1>Countries not found</h1>;

export const CountriesFound = () => {
  const isListType = useStore($isListType);

  return (
    <div className="countries-list__row">
      {useList($countries, (countryData: CountryMetaData) => {
        const country = getCountryInfo(countryData, isListType);

        return (
          <div className="countries-list__item" key={country.id}>
            <div className="country">
              <div className="country__inner">
                <div className="country__meta-wrapper">
                  <div className="country__flag-wrapper">
                    <img
                      className="country__flag"
                      src={country.flag}
                      alt={`${country.name}-flag`}
                    />
                  </div>

                  <h3 className="country__name">{country.name}</h3>

                  <div className="country__date">{country.joinDate}</div>
                </div>

                <div className="country__progress country-progress">
                  <h4 className="country__subtitle">Progress</h4>
                  <div
                    className={`country-progress__bubbles country-progress__bubbles--${country.bubbleProgressClass}`}
                  >
                    <div className="country-progress__bubble" />
                    <div className="country-progress__bubble" />
                    <div className="country-progress__bubble" />
                    <div className="country-progress__bubble" />
                  </div>

                  <h5 className="country-progress__title">
                    {country.progressDescription}
                  </h5>
                </div>

                <div className="country__schools-connectivity schools-connectivity">
                  <h4 className="country__subtitle">
                    Schools with connectivity
                  </h4>
                  <div className="schools-connectivity__bar">
                    <div
                      className="schools-connectivity__filler"
                      style={country.progressBarStyle}
                    />
                  </div>

                  <div className="schools-connectivity__percentage-connected">
                    {formatPercent(country.progressPercent)}
                  </div>
                </div>

                <div className="country__separator" />

                <p className="country__description">{country.description}</p>

                <Link
                  className="country__view-on-map view-on-map"
                  to={mapCountry}
                  params={{ id: country.id }}
                >
                  <div
                    className="country__view-on-map view-on-map"
                    style={country.mapPreviewStyle}
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
  <>{useStore($notFound) ? <NotFound /> : <CountriesFound />}</>
);
