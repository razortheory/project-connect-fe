import clsx from 'clsx';
import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';

import IconRightArrow from '~/assets/images/icon-right-arrow.svg';
import { $isMobile } from '~/core/media-query';
import {
  about,
  countryProgress,
  exactRoot,
  joinUs,
  mapCountries,
  mapOverview,
  media,
  privacy,
} from '~/core/routes';
import { Link, useRoute } from '~/lib/router';
import { Button } from '~/ui';

import { $isMenuOpen, toggleMenu } from '@/project/model';

export const Header = () => {
  const isMenuOpen = useStore($isMenuOpen);
  const isMobile = useStore($isMobile);

  const [isAboutSubmenuOpen, setIsAboutSubmenuOpen] = useState(false);
  const [isPrivacySubmenuOpen, setIsPrivacySubmenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsAboutSubmenuOpen(false);
      setIsPrivacySubmenuOpen(false);
    }
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container-fluid">
        <Link to={exactRoot} className="header__logo logo">
          Project&nbsp;connect
        </Link>

        <button
          type="button"
          className={clsx('menu-icon', {
            'menu-icon--open': isMenuOpen,
          })}
          onClick={() => toggleMenu()}
        >
          <span className="visually-hidden">Show menu</span>
          <span className="line line-1" />
          <span className="line line-2" />
        </button>

        <nav
          className={clsx('header__nav', {
            'header__nav--mobile-visible': isMenuOpen,
          })}
        >
          <div className="header__view-connectivity view-connectivity">
            <Link to={mapCountries}>
              <Button>View connectivity map</Button>
            </Link>
          </div>
          <ul className="menu">
            <li
              className={clsx('menu__item', {
                'menu__item--desktop-view': !isMobile,
                'menu__item--expanded': isAboutSubmenuOpen,
              })}
            >
              <button
                type="button"
                className={clsx('menu__link', {
                  'menu__link--active': useRoute(about),
                })}
                onClick={() => {
                  if (isMobile) {
                    setIsAboutSubmenuOpen(!isAboutSubmenuOpen);
                  } else {
                    about.navigate();
                  }
                }}
              >
                <span className="menu__link-inner">
                  About
                  <IconRightArrow className="menu__arrow" />
                </span>
              </button>
              <ul className="menu">
                <li className="menu__item">
                  <Link to={about} hash="#introduction" className="menu__link">
                    <span className="menu__link-inner">Introduction</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to={about} hash="#case-studies" className="menu__link">
                    <span className="menu__link-inner">Case studies</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to={about} hash="#why-mapping" className="menu__link">
                    <span className="menu__link-inner">Why mapping</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to={about} hash="#our-partners" className="menu__link">
                    <span className="menu__link-inner">Our partners</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu__item">
              <Link
                to={countryProgress}
                className={clsx('menu__link', {
                  'menu__link--active': useRoute(countryProgress),
                })}
              >
                <span className="menu__link-inner">Country progress</span>
              </Link>
            </li>
            <li
              className={clsx('menu__item', {
                'menu__item--desktop-view': !isMobile,
                'menu__item--expanded': isPrivacySubmenuOpen,
              })}
            >
              <button
                type="button"
                className={`menu__link ${
                  useRoute(privacy) ? 'menu__link--active' : ''
                }`}
                onClick={() => {
                  if (isMobile) {
                    setIsPrivacySubmenuOpen(!isPrivacySubmenuOpen);
                  } else {
                    privacy.navigate();
                  }
                }}
              >
                <span className="menu__link-inner">
                  methods & data sharing
                  <IconRightArrow className="menu__arrow" />
                </span>
              </button>
              <ul className="menu">
                <li className="menu__item">
                  <Link to={privacy} hash="#methods" className="menu__link">
                    <span className="menu__link-inner">methods</span>
                  </Link>
                </li>
                <li className="menu__item">
                  <Link
                    to={privacy}
                    hash="#data-sharing"
                    className="menu__link"
                  >
                    <span className="menu__link-inner">
                      Data sharing & privacy
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu__item">
              <Link
                to={media}
                className={clsx('menu__link', {
                  'menu__link--active': useRoute(media),
                })}
              >
                <span className="menu__link-inner">Media</span>
              </Link>
            </li>
            <li className="menu__item">
              <Link
                to={joinUs}
                className={clsx('menu__link', {
                  'menu__link--active': useRoute(joinUs),
                })}
              >
                <span className="menu__link-inner">Join Us</span>
              </Link>
            </li>
          </ul>
          <Link
            to={mapOverview}
            className="header__button button button--primary"
          >
            Connectivity map
          </Link>
        </nav>
      </div>
    </header>
  );
};
