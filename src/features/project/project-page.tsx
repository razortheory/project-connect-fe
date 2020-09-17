import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import IconFacebook from '~/assets/images/icon-facebook-logo.svg';
import IconGithub from '~/assets/images/icon-github-logo.svg';
import IconTwitter from '~/assets/images/icon-twitter-logo.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';
import { AppFrame } from '~/core';
import {
  about,
  countryProgress,
  exactRoot,
  joinUs,
  mapOverview,
  media,
  privacy,
} from '~/core/routes';
import { Link, useRoute } from '~/lib/router';

import { About } from './about';
import { CountryProgress } from './country-progress';
import { JoinUs } from './join-us';
import { Media } from './media';

export const ProjectPage = () => (
  <AppFrame>
    <div className="app app--inner">
      <header className="header">
        <div className="container-fluid">
          <Link to={exactRoot} type="button" className="header__logo logo">
            Project&nbsp;connect
          </Link>
          {/* header__nav--mobile-visible on menu button click */}
          <nav className="header__nav">
            <ul className="menu">
              <li className="menu__item">
                <Link
                  to={about}
                  className={`menu__link ${
                    useRoute(about) ? 'menu__link--active' : ''
                  }`}
                >
                  About
                </Link>
                <ul className="menu">
                  <li className="menu__item">
                    <button type="button" className="menu__link">
                      Second level
                    </button>
                  </li>
                  <li className="menu__item">
                    <button type="button" className="menu__link">
                      Second level 2
                    </button>
                  </li>
                </ul>
              </li>
              <li className="menu__item">
                <Link
                  to={countryProgress}
                  className={`menu__link ${
                    useRoute(countryProgress) ? 'menu__link--active' : ''
                  }`}
                >
                  Country progress
                </Link>
              </li>
              <li className="menu__item">
                <button type="button" className="menu__link">
                  Data sharing & privacy
                </button>
              </li>
              <li className="menu__item">
                <Link
                  to={media}
                  className={`menu__link ${
                    useRoute(media) ? 'menu__link--active' : ''
                  }`}
                >
                  Media
                </Link>
              </li>
              <li className="menu__item">
                <Link
                  to={joinUs}
                  className={`menu__link ${
                    useRoute(joinUs) ? 'menu__link--active' : ''
                  }`}
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            to={mapOverview}
            className="header__button button button--primary"
          >
            Connectivity map
          </Link>
        </div>
      </header>
      <main className="content">
        {useRoute(about) && <About />}
        {useRoute(countryProgress) && <CountryProgress />}
        {useRoute(privacy) && <br />}
        {useRoute(media) && <Media />}
        {useRoute(joinUs) && <JoinUs />}
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__row">
            <div className="footer__info-wrapper">
              <div className="footer__info">
                <a href="/" className="footer__main-logo">
                  Project Connect
                </a>
                <p className="footer__description">
                  Connecting every young person to information, opportunity and
                  choice.
                </p>
              </div>
              <div className="footer__supporters">
                <h4 className="footer__supporters-title">Supported by</h4>
                <Giga className="footer__supporter-logo" alt="Unicef logo" />
                <Unicef className="footer__supporter-logo" alt="Giga logo" />
              </div>
            </div>

            <nav className="footer__nav">
              <ul className="footer__menu footer-menu">
                <li className="footer-menu__item">
                  <a href="/" className="footer-menu__link">
                    Connectivity map
                  </a>
                </li>
                <li className="footer-menu__item">
                  <a href="/" className="footer-menu__link">
                    About
                  </a>
                </li>
                <li className="footer-menu__item">
                  <a href="/" className="footer-menu__link">
                    Country Progress
                  </a>
                </li>
                <li className="footer-menu__item">
                  <a href="/" className="footer-menu__link">
                    Methods & data privacy
                  </a>
                </li>
                <li className="footer-menu__item">
                  <a href="/" className="footer-menu__link">
                    Join us
                  </a>
                </li>
              </ul>
              <ul className="footer__socials footer-socials">
                <li className="footer-socials__item">
                  <a href="/" className="footer-socials__link">
                    <span className="footer-socials__icon">
                      <IconTwitter />
                    </span>
                  </a>
                </li>
                <li className="footer-socials__item">
                  <a href="/" className="footer-socials__link">
                    <span className="footer-socials__icon">
                      <IconFacebook />
                    </span>
                  </a>
                </li>
                <li className="footer-socials__item">
                  <a href="/" className="footer-socials__link">
                    <span className="footer-socials__icon">
                      <IconGithub />
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  </AppFrame>
);
