import { useStore } from 'effector-react';
import React from 'react';

import { DashboardSidebar } from './components/dashboard-sidebar';
import { $isListType, $noSearchResults, SearchSortBlock } from './components/search-sort-block';
import { SearchResults } from './components/search-sort-results';

const MainContent = () => (
  /* countries-list--grid-view and countries-list--list-view for layout switching */
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

    <SearchResults />
  </div>
);

export const Dashboard = () => (
  <>
    <section className="section section--inverted">
      <div className="container progress-dashboard">
        <div className="progress-dashboard__row">
          <DashboardSidebar />
          <div className="progress-dashboard__countries-col">
            <SearchSortBlock />

            <MainContent />
          </div>
        </div>
      </div>
    </section>
  </>
);
