import { useStore } from 'effector-react';
import React from 'react';

import {
  $isListType,
  $isLoading,
  $noSearchResults,
} from '@/project/@/dashboard/model';

import { DashboardDescription } from './dashboard-description';
import { SearchSortBox } from './search-sort-box';
import { SearchResults } from './search-sort-results';

export const Dashboard = () => (
  <>
    <section className="section section--inverted">
      <div className="container progress-dashboard">
        <div className="progress-dashboard__row">
          <DashboardDescription />
          <div className="progress-dashboard__countries-col">
            <SearchSortBox />
            <div
              className={`progress-dashboard__countries-list countries-list
                ${
                  useStore($isListType)
                    ? 'countries-list--list-view'
                    : 'countries-list--grid-view'
                }`}
            >
              {useStore($noSearchResults) ? null : (
                <div className="countries-list__grid-header">
                  <div className="countries-list__grid-row">
                    <div className="countries-list__grid-col countries-list__grid-col--country">
                      Country name
                    </div>
                    <div className="countries-list__grid-col countries-list__grid-col--date">
                      Date of joining
                    </div>
                    <div className="countries-list__grid-col countries-list__grid-col--progress">
                      Progress
                    </div>
                    <div className="countries-list__grid-col countries-list__grid-col--schools">
                      Schools with connectivity
                    </div>
                    <div className="countries-list__grid-col countries-list__grid-col--link" />
                  </div>
                </div>
              )}
              {useStore($isLoading) ? <p>Loading...</p> : <SearchResults />}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
