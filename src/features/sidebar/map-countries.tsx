import { useStore } from 'effector-react';
import React from 'react';

import MapWithHand from '../../assets/images/map-with-hand.svg';
import { mapCountries, mapCountry } from '../../core/routes';
import { tabControls, tabInfo, tabMap } from '../../core/tab-routes';
import { Link, useRoute } from '../../lib/router';
import { statusPaintField } from '../map/constants';
import { $countriesData } from '../map/country';
import { $stylePaintData } from '../map/model';
import { CountryData } from '../map/types';
import { $showSearchResults, Search } from './search';
import { SearchResults } from './search-results';

const CountriesList = () => {
  const countries = useStore($countriesData);
  const paintData = useStore($stylePaintData);

  if (!countries) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="map-hint">
        <MapWithHand className="map-hint__image" alt="Unicef logo" />
        <p className="map-hint__text">
          Click on the country of interest to view the connectivity and location
          of schools.
        </p>
      </div>
      <ul className="list">
        {countries
          .sort((a, b) => b.integration_status - a.integration_status)
          .map((country: CountryData) => (
            <li
              key={country.id}
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
          ))}
      </ul>
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
    {useRoute(tabInfo) && <CountriesList />}
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

export const MapCountries = () => (
  <>
    <Search />
    {!useStore($showSearchResults) && <Tabs />}
    <div
      className={`sidebar__content ${
        useRoute(tabMap) ? 'sidebar__content--hidden' : ''
      }`}
    >
      {useStore($showSearchResults) ? <SearchResults /> : <Content />}
    </div>
  </>
);
