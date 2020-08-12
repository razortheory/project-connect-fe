import React from 'react';
import { Map } from '~/features/map';

import Chevron from '~/assets/images/chevron.svg';
import Giga from '~/assets/images/giga-logo-footer.svg';
import MapWithHand from '~/assets/images/map-with-hand.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';

export const Root = (): JSX.Element => (
  <div className="app">
    <div className="map-placeholder">
      <Map />
    </div>
    <header className="header">
      <div className="container">
        <a href="/" className="header__logo logo">
          Project connect
        </a>
        <a href="/" className="header__button button button--primary">
          Project info
        </a>
      </div>
    </header>
    <main className="content">
      <div className="sidebar">
        <div className="sidebar__container">
          <div className="sidebar__search-bar search-bar">
            <div className="search-bar__icon" />
            <input
              className="search-bar__input"
              type="text"
              placeholder="Search for a country"
            />
            <button className="search-bar__close" type="button">
              +
            </button>
          </div>
          <ul className="sidebar__tabs tabs">
            <li className="tabs__item">
              <button className="tabs__button" type="button">
                Map
              </button>
            </li>
            <li className="tabs__item">
              <button
                className="tabs__button tabs__button--active"
                type="button"
              >
                Info
              </button>
            </li>
            <li className="tabs__item">
              <button className="tabs__button" type="button">
                Controls
              </button>
            </li>
          </ul>
          <h2 className="sidebar__title">
            Connecting every young person to information, opportunity and
            choice.
          </h2>
          <div className="sidebar__content">
            <p className="sidebar__paragraph">
              Project Connect aims to map real-time connectivity of every school
              in the world. This will serve as foundation to work with
              governments and service providers to connect every school to the
              internet.
            </p>
            <ul className="sidebar__list info-list">
              <li className="info-list__item">
                <h3 className="info-list__title">0.8M / 6M</h3>
                <p className="info-list__description">Schools mapped</p>
              </li>
              <li className="info-list__item">
                <h3 className="info-list__title">87%</h3>
                <p className="info-list__description">
                  Schools without connectivity
                </p>
              </li>
              <li className="info-list__item">
                <h3 className="info-list__title">43</h3>
                <p className="info-list__description">
                  Countries joined Project Connect
                </p>
              </li>
            </ul>
            <button className="button button--primary" type="button">
              Select a country
            </button>
          </div>
          <div className="sidebar__content">
            <div className="map-hint">
              <MapWithHand className="map-hint__image" alt="Unicef logo" />
              <p className="map-hint__text">
                Click on the country of interest to view the connectivity and
                location of schools.
              </p>
            </div>
            <ul className="list">
              <li className="list__item list__item--connected">Brazil</li>
              <li className="list__item list__item--connected">Colombia</li>
              <li className="list__item list__item--connected">Kazakhstan</li>
              <li className="list__item list__item--connected">Kyrgyzstan</li>
              <li className="list__item list__item--connected">
                Democratic Republic of Congo
              </li>

              <li className="list__item list__item--verified">
                Dominican Republic
              </li>
              <li className="list__item list__item--verified">Guadeloupe</li>
              <li className="list__item list__item--verified">Honduras</li>
              <li className="list__item list__item--verified">Liberia</li>
              <li className="list__item list__item--verified">Mauritania</li>
              <li className="list__item list__item--verified">Philippines</li>

              <li className="list__item list__item--not-verified">
                Puerto Rico
              </li>
              <li className="list__item list__item--not-verified">
                Saint Maarten
              </li>
              <li className="list__item list__item--not-verified">
                Virgin Islands
              </li>
              <li className="list__item list__item--not-verified">
                Sierra Leone
              </li>
              <li className="list__item list__item--not-verified">Australia</li>
              <li className="list__item list__item--not-verified">Austria</li>
            </ul>
          </div>
          <div className="sidebar__content">
            <h3 className="sidebar__secondary-title">
              Daily speed graph (download)
            </h3>
            <div className="week-graph">
              <div className="week-graph__item">
                <div className="week-graph__pillar">
                  <div className="week-graph__filler week-graph__filler--good" />
                </div>
                <span className="week-graph__day">F</span>
              </div>
              <div className="week-graph__item">
                <div className="week-graph__pillar">
                  <div className="week-graph__filler week-graph__filler--bad" />
                </div>
                <span className="week-graph__day">Sa</span>
              </div>
              <div className="week-graph__item">
                <div className="week-graph__pillar">
                  <div className="week-graph__filler week-graph__filler--middle" />
                </div>
                <span className="week-graph__day">Su</span>
              </div>
              <div className="week-graph__item">
                <div className="week-graph__pillar">
                  <div className="week-graph__filler week-graph__filler--middle" />
                </div>
                <span className="week-graph__day">M</span>
              </div>
              <div className="week-graph__item">
                <div className="week-graph__pillar">
                  <div className="week-graph__filler week-graph__filler--good" />
                </div>
                <span className="week-graph__day">Tu</span>
              </div>
              <div className="week-graph__item">
                <div className="week-graph__pillar">
                  <div className="week-graph__filler week-graph__filler--bad" />
                </div>
                <span className="week-graph__day">W</span>
              </div>
              <div className="week-graph__item">
                <div className="week-graph__pillar">
                  <div className="week-graph__filler week-graph__filler--middle" />
                </div>
                <span className="week-graph__day">Th</span>
              </div>
            </div>
          </div>
        </div>
        <button className="sidebar__expander" type="button">
          <Chevron alt="Expand/collapse sidebar" />
        </button>
      </div>
    </main>
    <footer className="footer">
      <Unicef className="footer__logo" alt="Unicef logo" />
      <Giga className="footer__logo" alt="Giga logo" />
      <ul className="footer__map-legend map-legend">
        <li className="map-legend__item map-legend__item--connected">
          School location +connectivity
        </li>
        <li className="map-legend__item map-legend__item--verified">
          School location (verified)
        </li>
        <li className="map-legend__item map-legend__item--not-verified">
          School location (not&nbsp;verified)
        </li>
      </ul>
      <ul className="footer__map-switcher map-switcher">
        <li className="map-switcher__item map-switcher__item--active">Dark</li>
        <li className="map-switcher__item">Light</li>
        <li className="map-switcher__item">Satellite</li>
        <li className="map-switcher__item">Accessible</li>
      </ul>
      <div className="footer__map-resizer map-resizer">
        <button className="map-resizer__button" type="button">
          <span className="map-resizer__line" />
        </button>
        <button className="map-resizer__button" type="button">
          <span className="map-resizer__line" />
          <span className="map-resizer__line map-resizer__line--vertical" />
        </button>
      </div>
    </footer>
  </div>
);
