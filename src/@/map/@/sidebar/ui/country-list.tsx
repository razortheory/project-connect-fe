import { useStore } from 'effector-react';
import React from 'react';

import MapWithHand from '~/assets/images/map-with-hand.svg';
import { mapCountries, mapCountry, router } from '~/core/routes';
import { tabControls, tabInfo, tabMap } from '~/core/tab-routes';
import { Link, useRoute } from '~/lib/router';

import {
  $countryList,
  $noSearchResults,
  $searchActive,
} from '@/map/@/sidebar/model';
import { Sort } from '@/map/@/sidebar/ui/sort';
import { statusPaintField } from '@/map/constants';
import { $stylePaintData } from '@/map/model';
import { CountryData } from '@/map/types';

import { onClear, Search } from './search';

export const ListItem = ({ country }: { country: CountryData }) => {
  const paintData = useStore($stylePaintData);
  return (
    <li
      className={`list__item ${
        country.integration_status === 0 ? 'list__item--disabled' : ''
      }`}
    >
      <div
        className="list__circle"
        style={{
          backgroundColor: paintData[
            statusPaintField[country.integration_status]
          ] as string,
        }}
      />
      <Link to={mapCountry} params={{ id: country.id }}>
        {country.name}
      </Link>
    </li>
  );
};

export const NotFound = () => (
  <div className="sidebar__not-found not-found">
    <div className="not-found__icon">{/* Icon to be added here */}</div>
    <h3 className="not-found__title">Country not found</h3>
    <div className="not-found__description">
      Try browsing through our&#160;
      <div
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
        className="not-found__link"
        onClick={(event) => {
          onClear(event);
          mapCountries.navigate({ tab: '/info' });
        }}
      >
        country list
      </div>
    </div>
  </div>
);

const List = () => {
  const countries = useStore($countryList);
  const notFound = useStore($noSearchResults);
  const searchActive = useStore($searchActive);

  if (!countries) {
    return <>Loading...</>;
  }
  return (
    <>
      <Sort />
      {!searchActive && (
        <div className="map-hint">
          <MapWithHand className="map-hint__image" alt="Map with hand" />
          <p className="map-hint__text">
            Click on the country of interest to view the connectivity and
            location of schools.
          </p>
        </div>
      )}
      {notFound ? (
        <NotFound />
      ) : (
        <ul className="list">
          {countries.map((country: CountryData) => (
            <ListItem country={country} key={country.id} />
          ))}
        </ul>
      )}
    </>
  );
};

export const Tabs = () => (
  <ul className="sidebar__tabs tabs">
    <li className="tabs__item">
      <Link to={mapCountries} params={{ tab: tabMap.compile() }}>
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabMap) ? 'tabs__button--active' : ''
          }`}
        >
          Map
        </button>
      </Link>
    </li>

    <li className="tabs__item">
      <Link to={mapCountries} params={{ tab: tabInfo.compile() }}>
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabInfo) ? 'tabs__button--active' : ''
          }`}
        >
          Info
        </button>
      </Link>
    </li>

    <li className="tabs__item">
      <Link to={mapCountries} params={{ tab: tabControls.compile() }}>
        <button
          type="button"
          className={`tabs__button ${
            useRoute(tabControls) ? 'tabs__button--active' : ''
          }`}
        >
          Controls
        </button>
      </Link>
    </li>
  </ul>
);

export const Content = () => (
  <>
    {useRoute(tabMap) && <p>Map</p>}
    {useRoute(tabInfo) && <List />}
    {useRoute(tabControls) && (
      <>
        <form className="sidebar__form form" action="/">
          <div className="radio-group">
            <label
              className="radio-group__item radio"
              htmlFor="connectivity-map"
            >
              <input
                className="radio__input"
                id="connectivity-map"
                type="radio"
                name="map-type"
              />
              <span className="radio__label">Connectivity map</span>
              <div className="radio__marker" />
            </label>
            <label className="radio-group__item radio" htmlFor="coverage-map">
              <input
                className="radio__input"
                id="coverage-map"
                type="radio"
                name="map-type"
              />
              <span className="radio__label">Coverage map</span>
              <div className="radio__marker" />
            </label>
          </div>
          <hr className="sidebar__divider" />
          <div className="radio-group">
            <label className="radio-group__item radio" htmlFor="map-style-dark">
              <input
                className="radio__input"
                id="map-style-dark"
                type="radio"
                name="map-style"
              />
              <span className="radio__label">Dark</span>
              <div className="radio__marker" />
            </label>
            <label
              className="radio-group__item radio"
              htmlFor="map-style-light"
            >
              <input
                className="radio__input"
                id="map-style-light"
                type="radio"
                name="map-style"
              />
              <span className="radio__label">Light</span>
              <div className="radio__marker" />
            </label>
            <label
              className="radio-group__item radio"
              htmlFor="map-style-satellite"
            >
              <input
                className="radio__input"
                id="map-style-satellite"
                type="radio"
                name="map-style"
              />
              <span className="radio__label">Satellite</span>
              <div className="radio__marker" />
            </label>
            <label
              className="radio-group__item radio"
              htmlFor="map-style-accessible"
            >
              <input
                className="radio__input"
                id="map-style-accessible"
                type="radio"
                name="map-style"
              />
              <span className="radio__label">Accessible</span>
              <div className="radio__marker" />
            </label>
          </div>
          <button
            type="button"
            className="button button--primary button--full-width button--pull-bottom"
          >
            Apply
          </button>
        </form>
      </>
    )}
  </>
);

export const CountryList = () => (
  <>
    <Search />
    {!useStore($searchActive) && <Tabs />}
    <div
      className={`sidebar__content ${
        useRoute(tabMap) ? 'sidebar__content--hidden' : ''
      }`}
    >
      <Content />
    </div>
  </>
);
