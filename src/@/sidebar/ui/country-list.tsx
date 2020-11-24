import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import { CountryBasic } from '~/api/types';
import IconLocationCross from '~/assets/images/icon-location-cross.svg';
import MapWithHand from '~/assets/images/map-with-hand.svg';
import { ProgressBar } from '~/ui';

import { Scroll } from '@/scroll';
import {
  $countriesList,
  $countriesPending,
  $isContentTab,
  $isControlsTab,
  $isMapTab,
  $noSearchResults,
  $searchActive,
  clearSearchText,
  selectInfoTab,
} from '@/sidebar/model';

import { Controls } from './controls';
import { CountryListItem } from './country-list-item';
import { Search } from './search';
import { Sort } from './sort';
import { Tabs } from './tabs';

export const NotFound = () => (
  <div className="sidebar__not-found not-found">
    <div className="not-found__icon">
      <IconLocationCross />
    </div>
    <h3 className="not-found__title">Country not found</h3>
    <div className="not-found__description">
      Try browsing through our{' '}
      <button
        type="button"
        className="not-found__link"
        onClick={() => {
          clearSearchText();
          selectInfoTab();
        }}
      >
        country list
      </button>
    </div>
  </div>
);

const CountryListContent = () => {
  const countriesList = useStore($countriesList);
  const noSearchResults = useStore($noSearchResults);
  const searchActive = useStore($searchActive);
  const isLoading = useStore($countriesPending);

  return (
    <>
      {!searchActive && (
        <div className="map-hint">
          <MapWithHand className="map-hint__image" alt="Map with hand" />
          <p className="map-hint__text">
            Click on the country of interest to view the connectivity and
            location of schools.
          </p>
        </div>
      )}
      <ProgressBar pending={isLoading} />
      {noSearchResults ? (
        <NotFound />
      ) : (
        <ul className="sidebar__country-list list">
          {countriesList.map((country: CountryBasic) => (
            <CountryListItem country={country} key={country.id} />
          ))}
        </ul>
      )}
    </>
  );
};

export const CountryList = () => (
  <>
    <Search
      searchBarClassName="search-bar-connectivity"
      searchBarInputClassName="search-bar-connectivity__input"
    />
    {!useStore($searchActive) && (
      <>
        <Tabs />
        <Sort />
      </>
    )}
    <Scroll>
      <div
        className={clsx('sidebar__content', {
          'sidebar__content--hidden': useStore($isMapTab),
        })}
      >
        <>
          {useStore($isContentTab) && <CountryListContent />}
          {useStore($isControlsTab) && <Controls />}
        </>
      </div>
    </Scroll>
  </>
);
