import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { Scroll } from '~/ui/scroll';

import { Search } from './search';
import { WeekGraph } from './week-graph';

export const CountryInfo = () => (
  <>
    <Search />
    <Scroll>
      <div className="sidebar__content">
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
              Data provided by Ministry of Education, Brazil on 31st June 2019
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
      </div>
    </Scroll>
  </>
);
