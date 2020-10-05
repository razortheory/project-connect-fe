import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import { CountryBasic } from '~/api/types';
import IconLocationCross from '~/assets/images/icon-location-cross.svg';
import MapWithHand from '~/assets/images/map-with-hand.svg';
import { tabInfo } from '~/core/tab-routes';
import { Link } from '~/lib/router';

import {
  $countriesList,
  $countriesPending,
  $noSearchResults,
  $searchActive,
} from '@/map/@/sidebar/model';
import { Scroll } from '@/scroll';

import { Controls } from './controls';
import { CountryListItem } from './country-list-item';
import { onClear, Search } from './search';
import { Sort } from './sort';
import { Tabs } from './tabs';
import { $isContentTab, $isControlsTab, $isMapTab } from './view-model';

export const NotFound = () => (
  <div className="sidebar__not-found not-found">
    <div className="not-found__icon">
      <IconLocationCross />
    </div>
    <h3 className="not-found__title">Country not found</h3>
    <div className="not-found__description">
      Try browsing through our{' '}
      <Link to={tabInfo} className="not-found__link" onClick={onClear}>
        country list
      </Link>
    </div>
  </div>
);

const CountryListContent = () => {
  const countriesList = useStore($countriesList);
  const noSearchResults = useStore($noSearchResults);
  const searchActive = useStore($searchActive);
  const isLoading = useStore($countriesPending);

  if (isLoading) {
    return <>Loading...</>;
  }

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
    <Search />
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
