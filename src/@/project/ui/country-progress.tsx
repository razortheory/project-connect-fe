/* eslint-disable @typescript-eslint/naming-convention */
import { useStore } from 'effector-react';
import React from 'react';

import CountriesDashboard from '~/assets/images/countries-dashboard.jpg';
import { formatPercent } from '~/core/formatters';

import { $globalStats } from '@/map/model';
import { Dashboard } from '@/project/@/dashboard';
import { $isLoading } from '@/project/@/dashboard/model';

const DescriptionSection = () => {
  const { countries_joined, countries_connected_to_realtime } = useStore(
    $globalStats
  );

  const connectedPercent = countries_connected_to_realtime / countries_joined;

  const commitedCountries = Number(countries_joined) || 'No data';

  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h2 className="page-heading__title">
            Countries have been listed below with real-time updates on their
            progress with school mapping. The key metric that is used to
            evaluate project progress is the stage of mapping and the percentage
            of schools mapped.
          </h2>

          <div className="page-heading__media">
            <div className="page-heading__image-wrapper">
              <img
                className="page-heading__image"
                src={CountriesDashboard}
                alt="countries-dashboard"
              />
            </div>
            <div className="page-heading__info">
              <ul className="info-list info-list--heading">
                <li className="info-list__item">
                  <p className="info-list__description">
                    {formatPercent(connectedPercent)}
                  </p>
                  <h3 className="info-list__title">
                    Countries with real time connectivity data
                  </h3>
                </li>
                <li className="info-list__item">
                  <p className="info-list__description">{commitedCountries}</p>
                  <h3 className="info-list__title">
                    Countries committed to Project Connect
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CountryProgress = () => {
  const globalStats = useStore($globalStats);
  const noData = globalStats === null;

  return useStore($isLoading) || noData ? (
    <section className="section">
      <div className="container">
        <h1>Loading...</h1>
      </div>
    </section>
  ) : (
    <>
      <DescriptionSection />
      <Dashboard />
    </>
  );
};
