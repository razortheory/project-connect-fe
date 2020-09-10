import { useStore } from 'effector-react';
import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import MapPreview from '~/assets/images/preview-placeholder.jpg';
import { mapCountry } from '~/core/routes';
import { CountryData } from '~/features/map/types';
import { Link } from '~/lib/router';

import { $noSearchResults, $searchResults } from './search-sort-block';

export const NotFound = () => <h1>Countries not found</h1>;

export const CountriesFound = () => (
  <div className="countries-list__row">
    {useStore($searchResults)?.map((country: CountryData) => (
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

              <div className="country__date">
                {country.date_of_join ?? 'No data'}
              </div>
            </div>

            <div className="country__progress country-progress">
              <h4 className="country__subtitle">Progress</h4>
              <div className="country-progress__bubbles country-progress__bubbles--real-time-data">
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
              </div>

              <h5 className="country-progress__title">
                {country.integration_status ?? 'No data'}
              </h5>
            </div>

            <div className="country__schools-connectivity schools-connectivity">
              <h4 className="country__subtitle">Schools with connectivity</h4>
              <div className="schools-connectivity__bar">
                <div
                  className="schools-connectivity__filler"
                  style={{
                    width: `${country.schools_with_data_percentage ?? '50'}%`,
                  }}
                />
              </div>
              <div className="schools-connectivity__percentage-connected">
                {country.schools_with_data_percentage ?? 'No data'}
              </div>
            </div>

            <div className="country__separator" />

            <p className="country__description">
              {country.description ??
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.'}
            </p>

            <Link
              className="country__view-on-map view-on-map"
              to={mapCountry}
              params={{ id: country.id }}
            >
              <div
                className="country__view-on-map view-on-map"
                style={{
                  backgroundImage: `url(${country.map_preview ?? MapPreview})`,
                }}
              />
            </Link>

            <div className="country__link">
              <Chevron alt="View in map" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SearchResults = () => (
  <>{useStore($noSearchResults) ? <NotFound /> : <CountriesFound />}</>
);
