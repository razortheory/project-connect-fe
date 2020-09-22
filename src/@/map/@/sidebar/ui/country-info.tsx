import { useStore } from 'effector-react';
import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import IconDownload from '~/assets/images/icon-download.svg';
import { Scroll } from '~/ui/scroll';

import { $noSearchCountryFound, $searchActive } from '@/map/@/sidebar/model';
import { NotFound, Tabs } from '@/map/@/sidebar/ui/country-list';
import { SearchResults } from '@/map/@/sidebar/ui/search-results';

import { Search } from './search';
import { WeekGraph } from './week-graph';

export const CountryInfo = () => {
  const noSearchCountryFound = useStore($noSearchCountryFound);
  const searchActive = useStore($searchActive);
  return (
    <>
      <Search />
      <Tabs />
      <Scroll>
        <div className="sidebar__content">
          {searchActive && !noSearchCountryFound && <SearchResults />}
          {noSearchCountryFound ? (
            <NotFound />
          ) : (
            <>
              <div className="sidebar__period-picker period-picker">
                <button type="button" className="period-picker__button">
                  <Chevron className="chevron chevron--left" />
                </button>
                <div className="period-picker__period">This week</div>
                <button type="button" className="period-picker__button">
                  <Chevron className="chevron" />
                </button>
              </div>
              <ul className="info-list info-list--country-info">
                <li className="info-list__item">
                  <h3 className="info-list__title">Data source</h3>
                  <p className="info-list__paragraph">
                    Data provided by Ministry of Education, Brazil on 31st June
                    2019
                  </p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title">Total schools</h3>
                  <p className="info-list__description">53,329</p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title">Connected schools</h3>
                  <p className="info-list__description">30,897</p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title info-list__title--full-width">
                    avg. internet speed (download)
                  </h3>
                  <p className="info-list__description">1.2 Mb/s</p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title info-list__title--full-width">
                    Schools with no internet
                  </h3>
                  <p className="info-list__description">42%</p>
                </li>
              </ul>
              <hr className="sidebar__divider" />
              <WeekGraph showHistory showButtons />
              <hr className="sidebar__divider" />
              <h3 className="sidebar__secondary-title">
                Connectivity distribution
              </h3>
              <p>Place for radial graph</p>
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
