import React from 'react';

import CountriesPicture from '~/assets/images/countries-dashboard.jpg';
import { Dashboard } from '~/features/dashboard';

export const CountryProgressPage = () => (
  <>
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h2 className="page-heading__title">
            Countries have been listed below with real-time updates on their
            progress with school mapping. The key metric that is used to
            evaluate project progress is the stage of mapping and the percentage
            of schools mapped.{' '}
          </h2>

          <div className="page-heading__media">
            <div className="page-heading__image-wrapper">
              <img
                className="page-heading__image"
                src={CountriesPicture}
                alt="countries-dashboard"
              />
            </div>
            <div className="page-heading__info">
              <ul className="info-list info-list--heading">
                <li className="info-list__item">
                  <h3 className="info-list__title">30%</h3>
                  <p className="info-list__description">
                    Countries with real time connectivity data
                  </p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title">78.2%</h3>
                  <p className="info-list__description">
                    Countries committed to Project Connect
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Dashboard />
  </>
);
