import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import { getVoid } from '~/lib/effector-kit';
import { inputValue } from '~/lib/event-reducers';

import { SortKey } from '@/map/@/sidebar/types';
import { ControlsSort } from '@/map/@/sidebar/ui/controls-sort';
import {
  $controlsSortKey,
  $isControlsChanged,
  $isCountriesTab,
  $isListType,
  $isLoading,
  $isSortTab,
  $noSearchResults,
  changeControlsSortKey,
  selectCountriesTab,
  selectSortTab,
  submitControlsChanges,
} from '@/project/@/dashboard/model';

import { DashboardDescription } from './dashboard-description';
import { SearchSortBox } from './search-sort-box';
import { SearchResults } from './search-sort-results';

const onSortChange = changeControlsSortKey.prepend(inputValue<SortKey>());
const onSelectCountriesTab = selectCountriesTab.prepend(getVoid);
const onSelectSortTab = selectSortTab.prepend(getVoid);
const onSubmitControlsChanges = submitControlsChanges.prepend(getVoid);

export const Dashboard = () => {
  const loading = useStore($isLoading);
  const isCountriesTab = useStore($isCountriesTab);
  const isSortTab = useStore($isSortTab);
  const noSearchResults = useStore($noSearchResults);
  const isListType = useStore($isListType);
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
                  <button
                    type="button"
                    className={clsx('tabs__button', {
                      'tabs__button--active': isCountriesTab,
                    })}
                    onClick={onSelectCountriesTab}
                  >
                    country list
                  </button>
                </li>
                <li className="tabs__item">
                  <button
                    type="button"
                    className={clsx('tabs__button', {
                      'tabs__button--active': isSortTab,
                    })}
                    onClick={onSelectSortTab}
                  >
                    sort by
                  </button>
                </li>
              </ul>

              <div
                className={clsx(
                  'progress-dashboard__countries-list',
                  'countries-list',
                  {
                    'countries-list--list-view': isListType,
                    'countries-list--grid-view': !isListType,
                  }
                )}
              >
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    {isCountriesTab && (
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
                    {isSortTab && (
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
                          onClick={onSubmitControlsChanges}
                        >
                          Apply
                        </button>
                      </>
                    )}
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
