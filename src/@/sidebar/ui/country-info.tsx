import clsx from 'clsx';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import React from 'react';

import { getDatasetUrl } from '~/api/project-connect';
import Chevron from '~/assets/images/chevron.svg';
import IconDownload from '~/assets/images/icon-download.svg';
import IconSpeedHigh from '~/assets/images/icon-speed-high.svg';
import IconSpeedLow from '~/assets/images/icon-speed-low.svg';
import IconSpeedMedium from '~/assets/images/icon-speed-medium.svg';
import { formatWeekInterval } from '~/core/formatters';
import { $isMobile } from '~/core/media-query';
import { mapCountries } from '~/core/routes';
import { getVoid } from '~/lib/effector-kit';
import { selectValue } from '~/lib/event-reducers/select-value';
import { Link } from '~/lib/router';
import { ProgressBar } from '~/ui';

import {
  $country,
  $countryDailyStats,
  $countryId,
  $countryInfoPending,
  $countryWeeklyStats,
  $isOpenPopup,
} from '@/country/model';
import { $mapType, changeMapType } from '@/map/model';
import { MapType } from '@/map/types';
import { Scroll } from '@/scroll';
import {
  $isContentTab,
  $isControlsTab,
  $isMapTab,
  $isNextWeekAvailable,
  $isPreviousWeekAvailable,
  $isThisWeek,
  $noSearchCountryFound,
  $searchActive,
  $week,
  nextWeek,
  previousWeek,
  selectMapTab,
} from '@/sidebar/model';

import { Controls } from './controls';
import { NotFound } from './country-list';
import { getCountryInfo } from './get-country-info';
import { getWeekGraphData } from './get-week-graph-data';
import { PieChart } from './pie-chart';
import { Search } from './search';
import { SearchResults } from './search-results';
import { Tabs } from './tabs';
import { WeekGraph } from './week-graph';

const onNextWeek = nextWeek.prepend(getVoid);
const onPreviousWeek = previousWeek.prepend(getVoid);

const $countryInfo = $countryWeeklyStats.map(getCountryInfo);
const onSelectChange = changeMapType.prepend(selectValue<MapType>());

const $weekGraphData = $countryDailyStats.map(getWeekGraphData);

const CountryInfoStatistics = () => {
  const country = useStore($country);
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const dataSource = country?.data_source || 'N/A';
  const countryInfoPending = useStore($countryInfoPending);
  const weekGraphData = useStore($weekGraphData);
  const countryId = useStore($countryId);
  const datasetUrl = getDatasetUrl(countryId);

  const {
    schoolsTotal,
    schoolsConnected,
    connectionSpeed,
    schoolsWithNoInternet,
    hasStatistics,
    connectivityLevel,
  } = useStore($countryInfo) ?? {};

  if (countryInfoPending) {
    return <ProgressBar pending />;
  }
  if (!hasStatistics) {
    return <p>No data</p>;
  }

  return (
    <>
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
          <p className="info-list__description">{connectionSpeed}</p>
          <div className="average-speed">
            <div className={connectivityLevel}>
              <div className="average-speed__icon average-speed__icon--active">
                <IconSpeedLow />
                <div className="average-speed__tooltip tooltip tooltip--dark">
                  Internet speed good for <strong>emails and texting</strong>
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
                  Internet speed good for <strong>e-learning</strong>
                </div>
              </div>
            </div>
            <p className="average-speed__description">
              The average internet speed is good enough for accessing email and
              basic internet browsing.
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
      {weekGraphData && (
        <>
          <hr className="sidebar__divider" />
          <WeekGraph
            weekGraphData={weekGraphData}
            showHistory
            dataType="country"
          />
        </>
      )}
      <hr className="sidebar__divider" />
      <h3 className="sidebar__secondary-title">Connectivity distribution</h3>
      <PieChart />
      <hr className="sidebar__divider" />
      <h3 className="sidebar__secondary-title sidebar__secondary-title--mb-sm">
        Data set
      </h3>
      <p className="sidebar__paragraph">
        You can download the country map data by clicking on the button below.
        File format for the data set would be CSV and PDF.
      </p>
      <a className="sidebar__link link" href={datasetUrl} download>
        <IconDownload className="link__icon" />
        Download data set
      </a>
    </>
  );
};

const CountryInfoContent = () => {
  const week = useStore($week);
  const isThisWeek = useStore($isThisWeek);
  const isNextWeekAvailable = useStore($isNextWeekAvailable);
  const isPreviousWeekAvailable = useStore($isPreviousWeekAvailable);

  const noSearchCountryFound = useStore($noSearchCountryFound);

  return (
    <>
      {noSearchCountryFound ? (
        <NotFound />
      ) : (
        <>
          <div className="sidebar__period-picker period-picker">
            <button
              type="button"
              className="period-picker__button"
              disabled={!isPreviousWeekAvailable}
              onClick={onPreviousWeek}
            >
              <Chevron className="chevron chevron--left" />
            </button>
            <div className="period-picker__period">
              {isThisWeek ? 'This week' : formatWeekInterval(week)}
            </div>
            <button
              type="button"
              className="period-picker__button"
              disabled={!isNextWeekAvailable}
              onClick={onNextWeek}
            >
              <Chevron className="chevron" />
            </button>
          </div>
          <CountryInfoStatistics />
        </>
      )}
    </>
  );
};

const $showBreadcrumbs = combine(
  $isMobile,
  $isOpenPopup,
  $isMapTab,
  (isMobile, isOpenPopup, isMapTab) => !isMobile || !isOpenPopup || !isMapTab
);

export const CountryInfo = () => {
  const mapType = useStore($mapType);
  const country = useStore($country);
  const countryName = country?.name ?? '';
  const searchActive = useStore($searchActive);
  const noSearchCountryFound = useStore($noSearchCountryFound);

  return (
    <>
      <Search />
      {searchActive && !noSearchCountryFound && <SearchResults />}

      {useStore($showBreadcrumbs) && (
        <div className="breadcrumbs">
          <Link
            to={mapCountries}
            className="breadcrumbs__link"
            onClick={() => selectMapTab()}
          >
            {mapType} map{' '}
          </Link>
          {' > '}
          <span>{countryName}</span>
        </div>
      )}
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
          className={clsx('sidebar__content', {
            'sidebar__content--hidden': useStore($isMapTab),
          })}
        >
          {useStore($isContentTab) && <CountryInfoContent />}
          {useStore($isControlsTab) && <Controls />}
        </div>
      </Scroll>
    </>
  );
};