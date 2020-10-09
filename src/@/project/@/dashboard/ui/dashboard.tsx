import { combine } from 'effector';
import { useStore } from 'effector-react';
import React from 'react';

import {
  countryProgressTabCountries,
  countryProgressTabSort,
} from '~/core/country-progress-tab-routes';
import { inputValue } from '~/lib/event-reducers';
import { Link, useRoute } from '~/lib/router';

import { SortKey } from '@/map/@/sidebar/types';
import { ControlsSort } from '@/map/@/sidebar/ui/controls-sort';
import { $isDesktop, $isMobile } from '@/map/@/sidebar/ui/view-model';
import {
  $controlsSortKey,
  $isControlsChanged,
  $isListType,
  $isLoading,
  $noSearchResults,
  changeControlsSortKey,
  submitControlsChanges,
} from '@/project/@/dashboard/model';

import { DashboardDescription } from './dashboard-description';
import { SearchSortBox } from './search-sort-box';
import { SearchResults } from './search-sort-results';

export const $isCountriesTab = combine(
  $isDesktop,
  countryProgressTabCountries.visible,
  (isDesktop, tabInfoVisible) => isDesktop || tabInfoVisible
);

const $isSortTab = combine(
  $isMobile,
  countryProgressTabSort.visible,
  (isMobile, tabControlsVisible) => isMobile && tabControlsVisible
);

const onSortChange = changeControlsSortKey.prepend(inputValue<SortKey>());

export const Dashboard = () => {
  const loading = useStore($isLoading);
  const isCountriesTab = useStore($isCountriesTab);
  const isSortTab = useStore($isSortTab);
  const noSearchResults = useStore($noSearchResults);

  const sortKey = useStore($controlsSortKey);
  const isControlsChanged = useStore($isControlsChanged);

  return (
    <>
      <section className="section section--inverted">
        <div className="container progress-dashboard">
          <div className="progress-dashboard__row">
            <DashboardDescription />
            <div className="progress-dashboard__countries-col">
              <SearchSortBox />

              <ul className="progress-dashboard__tabs tabs">
                <li className="tabs__item">
                  <Link to={countryProgressTabCountries}>
                    <button
                      type="button"
                      className={`tabs__button ${
                        useRoute(countryProgressTabCountries)
                          ? 'tabs__button--active'
                          : ''
                      }`}
                    >
                      country list
                    </button>
                  </Link>
                </li>
                <li className="tabs__item">
                  <Link to={countryProgressTabSort}>
                    <button
                      type="button"
                      className={`tabs__button ${
                        useRoute(countryProgressTabSort)
                          ? 'tabs__button--active'
                          : ''
                      }`}
                    >
                      sort by
                    </button>
                  </Link>
                </li>
              </ul>

              <div
                className={`progress-dashboard__countries-list countries-list
                ${
                  useStore($isListType)
                    ? 'countries-list--list-view'
                    : 'countries-list--grid-view'
                }`}
              >
                {loading && <p>Loading...</p>}

                {!loading && isCountriesTab && (
                  <>
                    {noSearchResults ? null : (
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
                  </>
                )}

                {!loading && isSortTab && (
                  <>
                    <h3 className="sidebar__secondary-title">
                      select sort type
                    </h3>
                    <ControlsSort
                      sortKey={sortKey}
                      onChangeSortKey={onSortChange}
                    />
                    <button
                      type="button"
                      disabled={!isControlsChanged}
                      className="button button--primary button--full-width progress-dashboard__controls-button"
                      onClick={() => submitControlsChanges()}
                    >
                      Apply
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
