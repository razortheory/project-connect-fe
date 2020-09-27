import { useStore } from 'effector-react';
import React from 'react';

import { CountryData } from '~/api/types';
import Chevron from '~/assets/images/chevron.svg';
import IconDownload from '~/assets/images/icon-download.svg';
import IconSpeedHigh from '~/assets/images/icon-speed-high.svg';
import IconSpeedLow from '~/assets/images/icon-speed-low.svg';
import IconSpeedMedium from '~/assets/images/icon-speed-medium.svg';
import { formatNumber, formatPercent } from '~/core/formatters';
import { mapCountries } from '~/core/routes';
import { tabInfo } from '~/core/tab-routes';
import { getVoid } from '~/lib/effector-kit';
import { selectValue } from '~/lib/event-reducers/select-value';
import { humanFormat } from '~/lib/human-format';
import { Link } from '~/lib/router';

import { $countryData } from '@/map/@/country/model';
import { formatInterval } from '@/map/@/sidebar/lib/format-interval';
import {
  $isThisWeek,
  $noSearchCountryFound,
  $searchActive,
  $week,
  nextWeek,
  previousWeek,
} from '@/map/@/sidebar/model';
import { NotFound, Tabs } from '@/map/@/sidebar/ui/country-list';
import { SearchResults } from '@/map/@/sidebar/ui/search-results';
import { $mapType, changeMapType } from '@/map/model';
import { MapType } from '@/map/types';
import { Scroll } from '@/scroll/scroll';

import { PieChart } from './pie-chart';
import { Search } from './search';
import { WeekGraph } from './week-graph';

const onNextWeek = nextWeek.prepend(getVoid);
const onPreviousWeek = previousWeek.prepend(getVoid);

const getCountryInfo = (countryData: CountryData | null) => {
  if (!countryData) return null;

  const { statistics } = countryData;

  return {
    name: countryData.name,
    dataSource: countryData.data_source || 'N/A',
    schoolsTotal: formatNumber(statistics.schools_total),
    schoolsConnected: formatNumber(statistics.schools_connected),
    averageInternetSpeed: humanFormat(statistics.connectivity_speed, {
      unit: 'b/s',
      separator: ' ',
    }),
    schoolsWithNoInternet: statistics.schools_total
      ? formatPercent(
          statistics.schools_connectivity_no / statistics.schools_total
        )
      : 'N/A',
  };
};

const $countryInfo = $countryData.map(getCountryInfo);
const onSelectChange = changeMapType.prepend(selectValue<MapType>());

export const CountryInfo = () => {
  const noSearchCountryFound = useStore($noSearchCountryFound);
  const searchActive = useStore($searchActive);
  const week = useStore($week);
  const isThisWeek = useStore($isThisWeek);
  const countryInfo = useStore($countryInfo);
  const mapType = useStore($mapType);

  return (
    <>
      <Search />
      <div className="breadcrumbs">
        <Link
          to={mapCountries}
          className="breadcrumbs__link"
          params={{ tab: tabInfo.compile() }}
        >
          {mapType} map{' '}
        </Link>
        {' > '}
        <span>{countryInfo?.name}</span>
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
        <div className="sidebar__content">
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
                  {isThisWeek ? 'This week' : formatInterval(week)}
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
                  <p className="info-list__paragraph">
                    {countryInfo?.dataSource}
                  </p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title info-list__title--full-width">
                    Total schools
                  </h3>
                  <p className="info-list__description">
                    {countryInfo?.schoolsTotal}
                  </p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title info-list__title--full-width">
                    Connected schools
                  </h3>
                  <p className="info-list__description">
                    {countryInfo?.schoolsConnected}
                  </p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title info-list__title--full-width">
                    Avg. internet speed (download)
                  </h3>
                  <p className="info-list__description">
                    {countryInfo?.averageInternetSpeed}
                  </p>
                  <div className="average-speed">
                    <div className="average-speed__icons">
                      <div className="average-speed__icon average-speed__icon--active">
                        <IconSpeedLow />
                      </div>
                      <div className="average-speed__icon">
                        <IconSpeedMedium />
                      </div>
                      <div className="average-speed__icon">
                        <IconSpeedHigh />
                      </div>
                    </div>
                    <p className="average-speed__description">
                      The average internet speed is good enough for accessing
                      email and basic internet browsing.
                    </p>
                  </div>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title info-list__title--full-width">
                    Schools with no internet
                  </h3>
                  <p className="info-list__description">
                    {countryInfo?.schoolsWithNoInternet}
                  </p>
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
        </div>
      </Scroll>
    </>
  );
};
