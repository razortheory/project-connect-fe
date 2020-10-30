import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import IconFacebook from '~/assets/images/icon-facebook-logo.svg';
import IconGithub from '~/assets/images/icon-github-logo.svg';
import IconTwitter from '~/assets/images/icon-twitter-logo.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';

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
);
