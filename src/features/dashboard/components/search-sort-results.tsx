/* eslint-disable @typescript-eslint/naming-convention */
import { format } from 'date-fns';
import { useStore } from 'effector-react';
import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import MapPreview from '~/assets/images/preview-placeholder.jpg';
import { mapCountry } from '~/core/routes';
import { CountryData } from '~/features/map/types';
import { Link } from '~/lib/router';

import { $isListType, $noSearchResults, $searchResults } from './search-sort-box';

export const NotFound = () => <h1>Countries not found</h1>;

export const CountriesFound = () => {
  const searchResults = useStore($searchResults);
  const isListType = useStore($isListType);

  return (
    <div className="countries-list__row">
      {searchResults?.map((country: CountryData) => {
        const {
          id,
          flag,
          name,
          description,
          date_of_join,
          map_preview,
          integration_status,
          schools_with_data_percentage,
        } = country;

        const joinedDate = new Date(date_of_join as string);
        const dateFormat = isListType ?
          format(new Date(joinedDate), 'd LLL yyyy') :
          format(new Date(joinedDate), 'LLL yyyy');
        const joinedTitle = `${isListType ? '' : 'Joined in '}${dateFormat}`;

        const integrationStatus = integration_status ?? 'No data';
        const countryDescription = description ??
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.';
        const schoolPercent = schools_with_data_percentage ?? 'No data';

        const progressBarPercent = {
          width: `${schools_with_data_percentage ?? '5'}%`,
        }
        const mapPreviewBackground = {
          backgroundImage: `url(${map_preview ?? MapPreview})`,
        }

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

                  <div className="country__date">{joinedTitle}</div>
                </div>

                <div className="country__progress country-progress">
                  <h4 className="country__subtitle">Progress</h4>
                  <div className="country-progress__bubbles country-progress__bubbles--real-time-data">
                    <div className="country-progress__bubble" />
                    <div className="country-progress__bubble" />
                    <div className="country-progress__bubble" />
                    <div className="country-progress__bubble" />
                  </div>

                  <h5 className="country-progress__title">{integrationStatus}</h5>
                </div>

                <div className="country__schools-connectivity schools-connectivity">
                  <h4 className="country__subtitle">Schools with connectivity</h4>
                  <div className="schools-connectivity__bar">
                    <div
                      className="schools-connectivity__filler"
                      style={progressBarPercent}
                    />
                  </div>

                  <div className="schools-connectivity__percentage-connected">
                    {schoolPercent}
                  </div>
                </div>

                <div className="country__separator" />

                <p className="country__description">
                  {countryDescription}
                </p>

                <Link
                  className="country__view-on-map view-on-map"
                  to={mapCountry}
                  params={{ id }}
                >
                  <div
                    className="country__view-on-map view-on-map"
                    style={mapPreviewBackground}
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
}

export const SearchResults = () => (
  <>{useStore($noSearchResults) ? <NotFound /> : <CountriesFound />}</>
);
