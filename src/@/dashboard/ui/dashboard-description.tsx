import { useStore } from 'effector-react';
import React from 'react';

import IconLastData from '~/assets/images/icon-last-data.svg';

import { $globalStats } from '@/map/model';

export const DashboardDescription = () => {
  const { last_date_updated: lastDateUpdated } = useStore($globalStats);

  return (
    <div className="progress-dashboard__legend-col">
      <h2 className="progress-dashboard__title">Country progress dashboard</h2>

      <p className="progress-dashboard__description">
        This view allows the Project Connect partners and the public to view the
        progress of the countries that are a part of this initiative. This
        aligns with the values of transparency by real time monitoring of
        schools connected to the internet.
      </p>

      <div className="progress-dashboard__legend">
        <h3 className="progress-dashboard__status-title">
          Progress status legend
        </h3>

        <ul className="progress-dashboard__status-list status-list">
          <li className="status-list__item">
            <div className="status-list__country-progress country-progress">
              <div className="country-progress__bubbles country-progress__bubbles--joined">
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
              </div>

              <h4 className="country-progress__title">
                Country Joined Project Connect
              </h4>
            </div>
          </li>

          <li className="status-list__item">
            <div className="status-list__country-progress country-progress">
              <div className="country-progress__bubbles country-progress__bubbles--locations-mapped">
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
              </div>

              <h4 className="country-progress__title">
                School locations mapped
              </h4>
            </div>
          </li>

          <li className="status-list__item">
            <div className="status-list__country-progress country-progress">
              <div className="country-progress__bubbles country-progress__bubbles--connectivity-mapped">
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
              </div>

              <h4 className="country-progress__title">
                Static connectivity mapped
              </h4>
            </div>
          </li>

          <li className="status-list__item">
            <div className="status-list__country-progress country-progress">
              <div className="country-progress__bubbles country-progress__bubbles--real-time-data">
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
                <div className="country-progress__bubble" />
              </div>

              <h4 className="country-progress__title">
                Real time connectivity mapped
              </h4>
            </div>
          </li>
        </ul>
        {lastDateUpdated && (
          <div className="progress-dashboard__last-data">
            <IconLastData />
            <span>Data displayed was last updated in {lastDateUpdated}</span>
          </div>
        )}
      </div>
    </div>
  );
};
