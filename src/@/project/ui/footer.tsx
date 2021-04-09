import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import IconFacebook from '~/assets/images/icon-facebook-logo.svg';
import IconGithub from '~/assets/images/icon-github-logo.svg';
import IconTwitter from '~/assets/images/icon-twitter-logo.svg';
import Itu from '~/assets/images/itu-logo-footer.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';
import {
  about,
  countryProgress,
  joinUs,
  mapCountries,
  privacy,
} from '~/core/routes';
import { Link } from '~/lib/router';

export const Footer = () => (
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
            <div className="footer__supporter-logos">
              <Giga
                className="footer__supporter-logo"
                width="85"
                height="4"
                alt="Unicef logo"
              />
              <Unicef
                className="footer__supporter-logo"
                width="70"
                height="37"
                alt="Giga logo"
              />
              <Itu
                className="footer__supporter-logo"
                width="37"
                height="40"
                alt="ITU logo"
              />
            </div>
          </div>
        </div>

        <nav className="footer__nav">
          <ul className="footer__menu footer-menu">
            <li className="footer-menu__item">
              <Link to={mapCountries} className="footer-menu__link">
                Connectivity map
              </Link>
            </li>
            <li className="footer-menu__item">
              <Link to={about} className="footer-menu__link">
                About
              </Link>
            </li>
            <li className="footer-menu__item">
              <Link to={countryProgress} className="footer-menu__link">
                Country Progress
              </Link>
            </li>
            <li className="footer-menu__item">
              <Link to={privacy} className="footer-menu__link">
                Methods & data privacy
              </Link>
            </li>
            <li className="footer-menu__item">
              <Link to={joinUs} className="footer-menu__link">
                Join us
              </Link>
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
);
