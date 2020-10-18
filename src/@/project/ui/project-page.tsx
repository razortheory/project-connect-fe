import React from 'react';

import ImageDataSharing1 from '~/assets/images/data-sharing-1.jpg';
import ImageDataSharing2 from '~/assets/images/data-sharing-2.jpg';
import Giga from '~/assets/images/giga-logo-footer.svg';
import IconDataCollection from '~/assets/images/icon-data-collection.svg';
import IconFacebook from '~/assets/images/icon-facebook-logo.svg';
import IconGithub from '~/assets/images/icon-github-logo.svg';
import IconMachineLearning from '~/assets/images/icon-machine-learning.svg';
import IconMeasurement from '~/assets/images/icon-measurement.svg';
import IconPartnerships from '~/assets/images/icon-partnerships.svg';
import IconRightArrow from '~/assets/images/icon-right-arrow.svg';
import IconTwitter from '~/assets/images/icon-twitter-logo.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';
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
import { Button } from '~/ui/atoms';

import { About } from './about';
import { CountryProgress } from './country-progress';
import { JoinUs } from './join-us';
import { Media } from './media';

export const ProjectPage = () => (
  <div className="app app--inner">
    <header className="header">
      <div className="container-fluid">
        <Link to={exactRoot} type="button" className="header__logo logo">
          Project&nbsp;connect
        </Link>
        {/* menu-icon--open on menu button click */}
        <button type="button" className="menu-icon">
          <span className="visually-hidden">Show menu</span>
          <span className="line line-1" />
          <span className="line line-2" />
        </button>
        {/* header__nav--mobile-visible on menu button click */}
        <nav className="header__nav">
          <div className="header__view-connectivity view-connectivity">
            <Button>View connectivity map</Button>
          </div>
          <ul className="menu">
            <li className="menu__item">
              <Link
                to={about}
                className={`menu__link ${
                  useRoute(about) ? 'menu__link--active' : ''
                }`}
              >
                About
                <IconRightArrow className="menu__arrow" />
              </Link>
              <ul className="menu">
                <li className="menu__item">
                  <button type="button" className="menu__link">
                    Case studies
                  </button>
                </li>
                <li className="menu__item">
                  <button type="button" className="menu__link">
                    Why mapping
                  </button>
                </li>
                <li className="menu__item">
                  <button type="button" className="menu__link">
                    Our partners
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
              <Link
                to={privacy}
                className={`menu__link ${
                  useRoute(privacy) ? 'menu__link--active' : ''
                }`}
              >
                Data sharing & privacy
              </Link>
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
          <Link
            to={mapOverview}
            className="header__button button button--primary"
          >
            Connectivity map
          </Link>
        </nav>
      </div>
    </header>
    <main className="content">
      {useRoute(about) && <About />}
      {useRoute(countryProgress) && <CountryProgress />}
      {useRoute(privacy) && (
        <>
          <section className="section mapping">
            <div className="container">
              <div className="mapping__row">
                <div className="mapping__media">
                  <div className="mapping__image-wrapper">
                    <img
                      src={ImageDataSharing1}
                      alt="Data sharing"
                      className="mapping__image"
                    />
                  </div>
                </div>
                <div className="mapping__info">
                  <h3 className="mapping__title">
                    Project Connect’s mission to map the location and internet
                    access of every school in the world is undeniably ambitious.
                    There is no single approach that will allow us to achieve
                    it. Our approach is to combine a variety of methods to build
                    full, live maps that have never existed before.
                  </h3>
                  <ul className="mapping__list mapping-list">
                    <li className="mapping-list__item">
                      <div className="mapping-list__icon-wrapper">
                        <IconMachineLearning
                          className="mapping-list__icon"
                          alt="Machine Learning"
                        />
                      </div>
                      <div className="mapping-list__info-wrapper">
                        <h4 className="mapping-list__title">
                          Machine Learning
                        </h4>
                        <p className="mapping-list__text">
                          We train machine learning algorithms to identify
                          features of schools based on high-resolution satellite
                          imagery. This allows us to map new schools, validate
                          the accuracy of existing school location data, and
                          automatically update maps when school locations change
                          in the future.
                        </p>
                      </div>
                    </li>
                    <li className="mapping-list__item">
                      <div className="mapping-list__icon-wrapper">
                        <IconPartnerships
                          className="mapping-list__icon"
                          alt="Partnerships"
                        />
                      </div>
                      <div className="mapping-list__info-wrapper">
                        <h4 className="mapping-list__title">Partnerships</h4>
                        <p className="mapping-list__text">
                          As part of UNICEF, Project Connect is in a unique
                          position to partner with both government and the
                          private sector to develop a better map than either
                          have individually. We partner with Ministries of
                          Education and Ministries of ICT, as well as mobile
                          network operators, internet service providers, and
                          other tech companies to develop an open source dataset
                          for schools and telecommunications infrastructure.
                        </p>
                      </div>
                    </li>
                    <li className="mapping-list__item">
                      <div className="mapping-list__icon-wrapper">
                        <IconMeasurement
                          className="mapping-list__icon"
                          alt="Real-time internet measurement tools"
                        />
                      </div>
                      <div className="mapping-list__info-wrapper">
                        <h4 className="mapping-list__title">
                          Real-time internet measurement tools
                        </h4>
                        <p className="mapping-list__text">
                          To obtain periodical updates on the quality of service
                          of the intern as schools and create a live map of
                          connectivity, we work with governments to deploy
                          measurement tools in connected schools. Depending on
                          the context, we have deployed both hardware- and
                          software-based solutions.
                        </p>
                      </div>
                    </li>
                    <li className="mapping-list__item">
                      <div className="mapping-list__icon-wrapper">
                        <IconDataCollection
                          className="mapping-list__icon"
                          alt="Data collection from the field"
                        />
                      </div>
                      <div className="mapping-list__info-wrapper">
                        <h4 className="mapping-list__title">
                          Data collection from the field
                        </h4>
                        <p className="mapping-list__text">
                          In cases when data simply does not exist, we work with
                          governments and communities to develop datasets from
                          the ground up. Our team has developed a number of
                          tools and strategies to gather or crowdsource missing
                          data and support governments with these assets to
                          locate schools and evaluate connectivity status.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="section mapping">
            <div className="container">
              <a href="#data-sharing" id="data-sharing">
                <h2 className="section__title">Data Sharing & Privacy</h2>
              </a>
              <div className="mapping__row mapping__row--inverted">
                <div className="mapping__media">
                  <div className="mapping__image-wrapper">
                    <img
                      src={ImageDataSharing2}
                      alt="Data sharing and privacy"
                      className="mapping__image"
                    />
                  </div>
                </div>
                <div className="mapping__info">
                  <h3 className="mapping__title">
                    A foundational part of our mission is to provide a public,
                    online map of every school in the world, including real-time
                    data about the quality of each school’s connectivity. The
                    goal of this is to provide open information that can improve
                    educational outcomes for all children.
                  </h3>
                  <ul className="mapping__list mapping-list">
                    <li className="mapping-list__item">
                      <div className="mapping-list__icon-wrapper">
                        <IconMachineLearning
                          className="mapping-list__icon"
                          alt="School location data everywhere should be public"
                        />
                      </div>
                      <div className="mapping-list__info-wrapper">
                        <h4 className="mapping-list__title">
                          School location data everywhere should be public
                        </h4>
                        <p className="mapping-list__text">
                          The ability to know where education and other
                          foundational resources can is found is a public good.
                          In most places where data exists, school locations are
                          already shared publicly on sites like Google Maps,
                          2GIS, and OpenStreetMaps.
                        </p>
                      </div>
                    </li>
                    <li className="mapping-list__item">
                      <div className="mapping-list__icon-wrapper">
                        <IconMachineLearning
                          className="mapping-list__icon"
                          alt="Public data gathered with public money creates
                          public goods"
                        />
                      </div>
                      <div className="mapping-list__info-wrapper">
                        <h4 className="mapping-list__title">
                          Public data gathered with public money creates public
                          goods
                        </h4>
                        <p className="mapping-list__text">
                          Digital cooperation is a key enabler of Project
                          Connect’s mission. It is reflected in the priorities
                          of many organizations and recommended by the Secretary
                          General’s High-Level Panel on Digital Cooperation.
                        </p>
                      </div>
                    </li>
                    <li className="mapping-list__item">
                      <div className="mapping-list__icon-wrapper">
                        <IconMachineLearning
                          className="mapping-list__icon"
                          alt="Child protection should always be prioritized"
                        />
                      </div>
                      <div className="mapping-list__info-wrapper">
                        <h4 className="mapping-list__title">
                          Child protection should always be prioritized
                        </h4>
                        <p className="mapping-list__text">
                          To reduce risk, we do not make any school data other
                          than the location public. Project Connect adheres to
                          UNICEF’s Child Data Protection policies, and is
                          prepared to conduct risk assessments to evaluate
                          whether data sharing in a country, or region of a
                          country, is of particular concern.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
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
);
