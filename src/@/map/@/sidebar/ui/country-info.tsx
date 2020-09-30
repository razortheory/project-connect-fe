import { useStore } from 'effector-react';
import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import IconDownload from '~/assets/images/icon-download.svg';
import IconSpeedHigh from '~/assets/images/icon-speed-high.svg';
import IconSpeedLow from '~/assets/images/icon-speed-low.svg';
import IconSpeedMedium from '~/assets/images/icon-speed-medium.svg';
import { formatDateInterval } from '~/core/formatters';
import { mapCountries } from '~/core/routes';
import { tabMap } from '~/core/tab-routes';
import { getVoid } from '~/lib/effector-kit';
import { selectValue } from '~/lib/event-reducers/select-value';
import { Link } from '~/lib/router';

import { $country } from '@/map/@/country/model';
import {
  $isThisWeek,
  $noSearchCountryFound,
  $searchActive,
  $week,
  nextWeek,
  previousWeek,
} from '@/map/@/sidebar/model';
import { $mapType, changeMapType } from '@/map/model';
import { MapType } from '@/map/types';
import { Scroll } from '@/scroll';

import { Controls } from './controls';
import { NotFound } from './country-list';
import { getCountryInfo } from './get-country-info';
import { PieChart } from './pie-chart';
import { Search } from './search';
import { SearchResults } from './search-results';
import { Tabs } from './tabs';
import { $isContentTab, $isControlsTab, $isMapTab } from './view-model';
import { WeekGraph } from './week-graph';

const onNextWeek = nextWeek.prepend(getVoid);
const onPreviousWeek = previousWeek.prepend(getVoid);

const $countryInfo = $country.map(getCountryInfo);
const onSelectChange = changeMapType.prepend(selectValue<MapType>());

const CountryInfoContent = () => {
  const noSearchCountryFound = useStore($noSearchCountryFound);
  const searchActive = useStore($searchActive);
  const week = useStore($week);
  const isThisWeek = useStore($isThisWeek);

  const {
    dataSource,
    schoolsTotal,
    schoolsConnected,
    connectivitySpeed,
    schoolsWithNoInternet,
  } = useStore($countryInfo) ?? {};

  return (
    <>
      {searchActive && !noSearchCountryFound && <SearchResults />}
      {noSearchCountryFound ? (
        <NotFound />
      ) : (
        <>
          <div className="sidebar__period-picker period-picker">
            <button
              type="button"
              className="period-picker__button"
              onClick={onPreviousWeek}
            >
              <Chevron className="chevron chevron--left" />
            </button>
            <div className="period-picker__period">
              {isThisWeek ? 'This week' : formatDateInterval(week)}
            </div>
            <button
              type="button"
              className="period-picker__button"
              onClick={onNextWeek}
            >
              <Chevron className="chevron" />
            </button>
          </div>
          <ul className="info-list info-list--country-info">
            <li className="info-list__item">
              <h3 className="info-list__title info-list__title--full-width">
                Data source
              </h3>
              <p className="info-list__paragraph">{dataSource}</p>
            </li>
            <li className="info-list__item">
              <h3 className="info-list__title info-list__title--full-width">
                Total schools
              </h3>
              <p className="info-list__description">{schoolsTotal}</p>
            </li>
            <li className="info-list__item">
              <h3 className="info-list__title info-list__title--full-width">
                Connected schools
              </h3>
              <p className="info-list__description">{schoolsConnected}</p>
            </li>
            <li className="info-list__item">
              <h3 className="info-list__title info-list__title--full-width">
                Avg. internet speed (download)
              </h3>
              <p className="info-list__description">{connectivitySpeed}</p>
              <div className="average-speed">
                <div className="average-speed__icons average-speed__icons--medium">
                  <div className="average-speed__icon">
                    <IconSpeedLow />
                    <div className="average-speed__tooltip tooltip tooltip--dark">
                      Internet speed good for{' '}
                      <strong>emails and texting</strong>
                    </div>
                  </div>
                  <div className="average-speed__icon">
                    <IconSpeedMedium />
                    <div className="average-speed__tooltip tooltip tooltip--dark">
                      Internet speed good for <strong>video streaming</strong>
                    </div>
                  </div>
                  <div className="average-speed__icon">
                    <IconSpeedHigh />
                    <div className="average-speed__tooltip tooltip tooltip--dark">
                      Internet speed bad for <strong>e-learning</strong>
                    </div>
                  </div>
                </div>
                <p className="average-speed__description">
                  The average internet speed is good enough for accessing email
                  and basic internet browsing.
                </p>
              </div>
            </li>
            <li className="info-list__item">
              <h3 className="info-list__title info-list__title--full-width">
                Schools with no internet
              </h3>
              <p className="info-list__description">{schoolsWithNoInternet}</p>
            </li>
          </ul>
          <hr className="sidebar__divider" />
          <WeekGraph showHistory showButtons />
          <hr className="sidebar__divider" />
          <h3 className="sidebar__secondary-title">
            Connectivity distribution
          </h3>
          <PieChart />
          <hr className="sidebar__divider" />
          <h3 className="sidebar__secondary-title sidebar__secondary-title--mb-sm">
            Data set
          </h3>
          <p className="sidebar__paragraph">
            You can download the country map data by clicking on the button
            below. File format for the data set would be CSV and PDF.
          </p>
          <button type="button" className="sidebar__link link">
            <IconDownload className="link__icon" />
            Download data set
          </button>
        </>
      )}
    </>
  );
};

export const CountryInfo = () => {
  const mapType = useStore($mapType);

  const { name } = useStore($countryInfo) ?? {};

  return (
    <>
      <Search />
      <div className="breadcrumbs">
        <Link
          to={mapCountries}
          className="breadcrumbs__link"
          onClick={() => {
            tabMap.navigate();
          }}
        >
          {mapType} map{' '}
        </Link>
        {' > '}
        <span>{name}</span>
      </div>
      <label htmlFor="map-type-select" className="select-wrapper">
        <span className="visually-hidden">Sort map type</span>
        <select
          id="map-type-select"
          className="select"
          onChange={onSelectChange}
          value={mapType}
        >
          <option className="select__option" value="connectivity">
            Connectivity map
          </option>
          <option className="select__option" value="coverage">
            Coverage map
          </option>
        </select>
      </label>
      <Tabs />
      <Scroll>
        <div
          className={`sidebar__content ${
            useStore($isMapTab) ? 'sidebar__content--hidden' : ''
          }`}
        >
          {useStore($isContentTab) && <CountryInfoContent />}
          {useStore($isControlsTab) && <Controls />}
        </div>
      </Scroll>
    </>
  );
};
