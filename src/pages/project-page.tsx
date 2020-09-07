import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import IconAccountability from '~/assets/images/icon-accountability.svg';
import IconEquity from '~/assets/images/icon-data-equity.svg';
import IconPlanning from '~/assets/images/icon-information-for-planning.svg';
import IconInvestment from '~/assets/images/icon-investment.svg';
import IconLeftArrow from '~/assets/images/icon-left-arrow.svg';
import IconMarket from '~/assets/images/icon-market-data.svg';
import IconRightArrow from '~/assets/images/icon-right-arrow.svg';
import LogoArm from '~/assets/images/logo-arm.svg';
import LogoDevelopmentSeed from '~/assets/images/logo-development-seed.svg';
import LogoEricsson from '~/assets/images/logo-ericsson.svg';
import LogoFacebook from '~/assets/images/logo-facebook.svg';
import LogoGsma from '~/assets/images/logo-gsma.svg';
import LogoItu from '~/assets/images/logo-itu.svg';
import LogoLiquid from '~/assets/images/logo-liquid.svg';
import LogoMaxar from '~/assets/images/logo-maxar.svg';
import LogoSoftbank from '~/assets/images/logo-softbank.svg';
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

export const Media = () => (
  <section className="section">
    <h2 className="visually-hidden">Blog posts</h2>
    <div className="container">
      <div className="posts-row">
        <article className="post">
          <div className="post__image-wrapper">
            <img
              className="post__image"
              src="http://placehold.it/500x300.jpg"
              alt=""
            />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img
              className="post__image"
              src="http://placehold.it/500x300.jpg"
              alt=""
            />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img
              className="post__image"
              src="http://placehold.it/500x300.jpg"
              alt=""
            />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img
              className="post__image"
              src="http://placehold.it/500x300.jpg"
              alt=""
            />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export const CountryProgress = () => (
  <>
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h2 className="page-heading__title">
            Countries have been listed below with real-time updates on their
            progress with school mapping. The key metric that is used to
            evaluate project progress is the stage of mapping and the percentage
            of schools mapped.{' '}
          </h2>
          <div className="page-heading__media">
            <div className="page-heading__image-wrapper">
              <img
                className="page-heading__image"
                src="http://placehold.it/624x408.jpg"
                alt=""
              />
            </div>
            <div className="page-heading__info">
              <ul className="info-list info-list--heading">
                <li className="info-list__item">
                  <h3 className="info-list__title">30%</h3>
                  <p className="info-list__description">
                    Countries with real time connectivity data
                  </p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title">78.2%</h3>
                  <p className="info-list__description">
                    Countries committed to Project Connect
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section section--inverted">
      <div className="container progress-dashboard">
        <div className="progress-dashboard__row">
          <div className="progress-dashboard__legend-col">
            <h2 className="progress-dashboard__title">
              Country progress dashboard
            </h2>
            <p className="progress-dashboard__description">
              This view allows the Project Connect partners and the public to
              view the progress of the nations that are a part of this
              initiative. This aligns with the values of transparency by real
              time monitoring of schools connected to the internet.
            </p>
            <div className="progress-dashboard__legend">
              <h3 className="progress-dashboard__status-title">
                Progress status legend
              </h3>
              <ul className="progress-dashboard__status-list status-list">
                <li className="status-list__item">
                  <div className="status-list__country-progress country-progress">
                    <div className="country-progress__bubbles country-progress__bubbles--joined">
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                    </div>
                    <h4 className="country-progress__title">
                      Country Joined Project Connect
                    </h4>
                  </div>
                </li>
                <li className="status-list__item">
                  <div className="status-list__country-progress country-progress">
                    <div className="country-progress__bubbles country-progress__bubbles--locations-mapped">
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                    </div>
                    <h4 className="country-progress__title">
                      School locations mapped
                    </h4>
                  </div>
                </li>
                <li className="status-list__item">
                  <div className="status-list__country-progress country-progress">
                    <div className="country-progress__bubbles country-progress__bubbles--connectivity-mapped">
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                    </div>
                    <h4 className="country-progress__title">
                      Static connectivity mapped
                    </h4>
                  </div>
                </li>
                <li className="status-list__item">
                  <div className="status-list__country-progress country-progress">
                    <div className="country-progress__bubbles country-progress__bubbles--real-time-data">
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                      <div className="country-progress__bubble" />
                    </div>
                    <h4 className="country-progress__title">
                      Real time connectivity mapped
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="progress-dashboard__countries-col">
            <div className="progress-dashboard__controls-bar controls-bar">
              <div className="controls-bar__search search-bar">
                <div className="search-bar__icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 5.91986C0 2.65975 2.65978 0 5.91987 0C9.17994 0 11.8397 2.65975 11.8397 5.91986C11.8397 7.2663 11.3872 8.51222 10.6249 9.50877L14.7688 13.6527C15.0771 13.9609 15.0771 14.4606 14.7688 14.7688C14.4606 15.0771 13.9547 15.077 13.6465 14.7688L9.50878 10.6249C8.51213 11.3875 7.26659 11.8397 5.91987 11.8397C2.65978 11.8397 0 9.17994 0 5.91986ZM10.2611 5.91986C10.2611 3.51292 8.32676 1.57863 5.91987 1.57863C3.51294 1.57863 1.57863 3.51292 1.57863 5.91986C1.57863 8.32675 3.51294 10.2611 5.91987 10.2611C8.32676 10.2611 10.2611 8.32675 10.2611 5.91986Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <input
                  className="search-bar__input"
                  type="text"
                  placeholder="Search for a country"
                />
                <button type="button" className="search-bar__close">
                  +
                </button>
              </div>
              <div className="controls-bar__sort">
                Sort by: Country progress
              </div>
              <div className="controls-bar__view-changer">
                <button type="button" className="view-changer__button">
                  <svg
                    className="view-changer__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.8 5.5H17.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.8 10.5H17.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.8 15.5H17.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  List
                </button>
                <button
                  type="button"
                  className="view-changer__button view-changer__button--active"
                >
                  <svg
                    className="view-changer__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2.75"
                      y="2.75"
                      width="5.5"
                      height="5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="2.75"
                      y="11.75"
                      width="5.5"
                      height="5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="11.75"
                      y="2.75"
                      width="5.5"
                      height="5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="11.75"
                      y="11.75"
                      width="5.5"
                      height="5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Tile
                </button>
              </div>
            </div>
            {/* countries-list--grid-view and countries-list--list-view for layout switching */}
            <div className="progress-dashboard__countries-list countries-list countries-list--grid-view">
              <div className="countries-list__grid-header">
                <div className="countries-list__grid-row">
                  <div className="countries-list__grid-col countries-list__grid-col--country">
                    Country name
                  </div>
                  <div className="countries-list__grid-col countries-list__grid-col--date">
                    Date of joining
                  </div>
                  <div className="countries-list__grid-col countries-list__grid-col--progress">
                    Progress
                  </div>
                  <div className="countries-list__grid-col countries-list__grid-col--schools">
                    Schools with connectivity
                  </div>
                  <div className="countries-list__grid-col countries-list__grid-col--link" />
                </div>
              </div>
              <div className="countries-list__row">
                <div className="countries-list__item">
                  <div className="country">
                    <div className="country__inner">
                      <div className="country__meta-wrapper">
                        <div className="country__flag-wrapper">
                          <img
                            className="country__flag"
                            src="http://placehold.it/140x78.png"
                            alt=""
                          />
                        </div>
                        <h3 className="country__name">
                          Democratic Republic of Congo
                        </h3>
                        <div className="country__date">19 Aug 2019</div>
                      </div>
                      <div className="country__progress country-progress">
                        <h4 className="country__subtitle">Progress</h4>
                        <div className="country-progress__bubbles country-progress__bubbles--real-time-data">
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                        </div>
                        <h5 className="country-progress__title">
                          Real time connectivity mapped
                        </h5>
                      </div>
                      <div className="country__schools-connectivity schools-connectivity">
                        <h4 className="country__subtitle">
                          Schools with connectivity
                        </h4>
                        <div className="schools-connectivity__bar">
                          <div className="schools-connectivity__filler" />
                        </div>
                        <div className="schools-connectivity__percentage-connected">
                          67.5%
                        </div>
                      </div>
                      <div className="country__separator" />
                      <p className="country__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin fermentum urna tortor, eget laoreet arcu fermentum
                        sit amet. Sed aliquet, turpis vel fermentum elementum.
                      </p>
                      <div className="country__view-on-map view-on-map" />
                      <div className="country__link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#2779FF"
                            d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="countries-list__item">
                  <div className="country">
                    <div className="country__inner">
                      <div className="country__meta-wrapper">
                        <div className="country__flag-wrapper">
                          <img
                            className="country__flag"
                            src="http://placehold.it/140x78.png"
                            alt=""
                          />
                        </div>
                        <h3 className="country__name">Colombia</h3>
                        <div className="country__date">19 Aug 2019</div>
                      </div>
                      <div className="country__progress country-progress">
                        <h4 className="country__subtitle">Progress</h4>
                        <div className="country-progress__bubbles country-progress__bubbles--joined">
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                        </div>
                        <h5 className="country-progress__title">
                          Real time connectivity mapped
                        </h5>
                      </div>
                      <div className="country__schools-connectivity schools-connectivity">
                        <h4 className="country__subtitle">
                          Schools with connectivity
                        </h4>
                        <div className="schools-connectivity__bar">
                          <div className="schools-connectivity__filler" />
                        </div>
                        <div className="schools-connectivity__percentage-connected">
                          67.5%
                        </div>
                      </div>
                      <div className="country__separator" />
                      <p className="country__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin fermentum urna tortor, eget laoreet arcu fermentum
                        sit amet. Sed aliquet, turpis vel fermentum elementum.
                      </p>
                      <div className="country__view-on-map view-on-map" />
                      <div className="country__link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#2779FF"
                            d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="countries-list__item">
                  <div className="country">
                    <div className="country__inner">
                      <div className="country__meta-wrapper">
                        <div className="country__flag-wrapper">
                          <img
                            className="country__flag"
                            src="http://placehold.it/140x78.png"
                            alt=""
                          />
                        </div>
                        <h3 className="country__name">Brazil</h3>
                        <div className="country__date">19 Aug 2019</div>
                      </div>
                      <div className="country__progress country-progress">
                        <h4 className="country__subtitle">Progress</h4>
                        <div className="country-progress__bubbles country-progress__bubbles--locations-mapped">
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                        </div>
                        <h5 className="country-progress__title">
                          Real time connectivity mapped
                        </h5>
                      </div>
                      <div className="country__schools-connectivity schools-connectivity">
                        <h4 className="country__subtitle">
                          Schools with connectivity
                        </h4>
                        <div className="schools-connectivity__bar">
                          <div className="schools-connectivity__filler" />
                        </div>
                        <div className="schools-connectivity__percentage-connected">
                          67.5%
                        </div>
                      </div>
                      <div className="country__separator" />
                      <p className="country__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin fermentum urna tortor, eget laoreet arcu fermentum
                        sit amet. Sed aliquet, turpis vel fermentum elementum.
                      </p>
                      <div className="country__view-on-map view-on-map" />
                      <div className="country__link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#2779FF"
                            d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="countries-list__item">
                  <div className="country">
                    <div className="country__inner">
                      <div className="country__meta-wrapper">
                        <div className="country__flag-wrapper">
                          <img
                            className="country__flag"
                            src="http://placehold.it/140x78.png"
                            alt=""
                          />
                        </div>
                        <h3 className="country__name">Kenya</h3>
                        <div className="country__date">19 Aug 2019</div>
                      </div>
                      <div className="country__progress country-progress">
                        <h4 className="country__subtitle">Progress</h4>
                        <div className="country-progress__bubbles country-progress__bubbles--connectivity-mapped">
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                          <div className="country-progress__bubble" />
                        </div>
                        <h5 className="country-progress__title">
                          Real time connectivity mapped
                        </h5>
                      </div>
                      <div className="country__schools-connectivity schools-connectivity">
                        <h4 className="country__subtitle">
                          Schools with connectivity
                        </h4>
                        <div className="schools-connectivity__bar">
                          <div className="schools-connectivity__filler" />
                        </div>
                        <div className="schools-connectivity__percentage-connected">
                          67.5%
                        </div>
                      </div>
                      <div className="country__separator" />
                      <p className="country__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin fermentum urna tortor, eget laoreet arcu fermentum
                        sit amet. Sed aliquet, turpis vel fermentum elementum.
                      </p>
                      <div className="country__view-on-map view-on-map" />
                      <div className="country__link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#2779FF"
                            d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export const JoinUs = () => (
  <section className="section section--inverted">
    <h2 className="visually-hidden">Partner with us</h2>
    <div className="container partnership">
      <div className="partnership__row">
        <div className="partnership__tabs-list">
          <button
            type="button"
            className="partnership__button button button--large button--tertiary"
          >
            Government
          </button>
          <button
            type="button"
            className="partnership__button button button--large button--tertiary"
          >
            Non-profit or similar
          </button>
          <button
            type="button"
            className="partnership__button button button--large button--tertiary"
          >
            International organization
          </button>
          <button
            type="button"
            className="partnership__button button button--large button--tertiary"
          >
            Development bank
          </button>
          <button
            type="button"
            className="partnership__button button button--large button--tertiary"
          >
            ISP or Network provider
          </button>
          <button
            type="button"
            className="partnership__button button button--large button--tertiary"
          >
            tech company
          </button>
          <button
            type="button"
            className="partnership__button button button--large button--tertiary"
          >
            research institute
          </button>
        </div>
        <div className="partnership__tab-content">
          <h3 className="partnership__title">Share your data</h3>
          <p className="partnership__description">
            We are looking for information on locations of schools and their
            level of online connectivity. However, any piece of information
            about schools that you are interested in sharing, no matter how
            small, is extremely useful.
          </p>
          <h3 className="partnership__title">Share your data</h3>
          <p className="partnership__description">
            We are looking for information on locations of schools and their
            level of online connectivity. However, any piece of information
            about schools that you are interested in sharing, no matter how
            small, is extremely useful.
          </p>
          <h3 className="partnership__title">Share your data</h3>
          <p className="partnership__description">
            We are looking for information on locations of schools and their
            level of online connectivity. However, any piece of information
            about schools that you are interested in sharing, no matter how
            small, is extremely useful.
          </p>
          <h3 className="partnership__title">Share your data</h3>
          <p className="partnership__description">
            We are looking for information on locations of schools and their
            level of online connectivity. However, any piece of information
            about schools that you are interested in sharing, no matter how
            small, is extremely useful.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const About = () => (
  <>
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h2 className="page-heading__title">
            Countries have been listed below with real-time updates on their
            progress with school mapping. The key metric that is used to
            evaluate project progress is the stage of mapping and the percentage
            of schools mapped.{' '}
          </h2>
          <div className="page-heading__media">
            <div className="page-heading__image-wrapper">
              <img
                className="page-heading__image"
                src="http://placehold.it/624x408.jpg"
                alt=""
              />
            </div>
            <div className="page-heading__info">
              <ul className="info-list info-list--heading">
                <li className="info-list__item">
                  <h3 className="info-list__title">30%</h3>
                  <p className="info-list__description">
                    Countries with real time connectivity data
                  </p>
                </li>
                <li className="info-list__item">
                  <h3 className="info-list__title">78.2%</h3>
                  <p className="info-list__description">
                    Countries committed to Project Connect
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section case-studies">
      <div className="container">
        <h2 className="section__title">Case studies</h2>
        <div className="case-studies__row">
          <div className="case-studies__col">
            <div className="case-studies__slider-wrapper">
              <div className="case-studies__slider slider">
                <div className="slider__image-wrapper">
                  <img
                    className="slider__image"
                    src="http://placehold.it/500x500.png"
                    alt=""
                  />
                </div>
                <div className="slider__info-wrapper">
                  <div className="slider__title">Colombia</div>
                  <p className="slider__text">
                    We applied artificial intelligence techniques to
                    automatically map schools from satellite imagery and provide
                    the government the location of 7,000 schools that were not
                    part of their official datasets.
                  </p>
                </div>
              </div>
            </div>
            <div className="case-studies__slider-controls">
              <ul className="case-studies__slider-pagination slider-pagination">
                <li className="slider-pagination__item slider-pagination__item--active">
                  Colombia
                </li>
                <li className="slider-pagination__item">Seirra Leone</li>
                <li className="slider-pagination__item">Kyrgysztan</li>
                <li className="slider-pagination__item">Kenya</li>
              </ul>
              <div className="case-studies__slider-navigation slider-navigation">
                <button type="button" className="slider-navigation__button">
                  <IconLeftArrow
                    className="slider-navigation__icon"
                    alt="Go to previous slide"
                  />
                </button>
                <button type="button" className="slider-navigation__button">
                  <IconRightArrow
                    className="slider-navigation__icon"
                    alt="Go to next slide"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section mapping">
      <div className="container">
        <h2 className="section__title">Why mapping</h2>
        <div className="mapping__row">
          <div className="mapping__media">
            <div className="mapping__image-wrapper">
              <img
                src="http://placehold.it/508x585.png"
                alt=""
                className="mapping__image"
              />
            </div>
          </div>
          <div className="mapping__info">
            <h3 className="mapping__title">
              How many schools are in the world? Where are they? How many of
              them are connected to the Internet?{' '}
            </h3>
            <p className="mapping__text">
              Nobody has the answer to these foundational questions, at least
              not yet. In an increasingly digital world, lack of access to
              education and internet translates to exclusion, fewer resources to
              learn and grow, and limited opportunities for the most vulnerable
              children and youth. But without answers to these questions, we
              can’t change that.
            </p>
            <h3 className="mapping__title">In response</h3>
            <p className="mapping__text">
              UNICEF is mapping the location and real-time internet connection
              of every school in the world. This map, hosted on an open data
              platform, is helping governments and partners eliminate the
              digital divide globally. To date, 800,000 schools in 25 countries
              have been mapped and the number continues to grow at an
              accelerated pace.
            </p>
            <ul className="mapping__list mapping-list">
              <li className="mapping-list__item">
                <div className="mapping-list__icon-wrapper">
                  <IconAccountability
                    className="mapping-list__icon"
                    alt="Accountability and efficiency"
                  />
                </div>
                <div className="mapping-list__info-wrapper">
                  <h4 className="mapping-list__title">
                    Accountability and efficiency
                  </h4>
                  <p className="mapping-list__text">
                    Several national governments and NGOs are committed to
                    connecting schools to the Internet, but don’t yet have the
                    ability to monitor whether schools are connected and where.
                  </p>
                </div>
              </li>
              <li className="mapping-list__item">
                <div className="mapping-list__icon-wrapper">
                  <IconEquity
                    className="mapping-list__icon"
                    alt="Accountability and efficiency"
                  />
                </div>
                <div className="mapping-list__info-wrapper">
                  <h4 className="mapping-list__title">Data equity</h4>
                  <p className="mapping-list__text">
                    It has been proven that availability and quality of data is
                    considerably higher for wealthier regions. This data
                    inequity leads to disparities in resource allocation, where
                    vulnerable populations are left behind.
                  </p>
                </div>
              </li>
              <li className="mapping-list__item">
                <div className="mapping-list__icon-wrapper">
                  <IconMarket
                    className="mapping-list__icon"
                    alt="Better market data"
                  />
                </div>
                <div className="mapping-list__info-wrapper">
                  <h4 className="mapping-list__title">Better market data</h4>
                  <p className="mapping-list__text">
                    Because internet service providers aren’t able to measure
                    the size of potential new customers, they struggle to make a
                    case for bringing infrastructure to remote areas. This
                    results in limited investment and increased prices.
                  </p>
                </div>
              </li>
              <li className="mapping-list__item">
                <div className="mapping-list__icon-wrapper">
                  <IconPlanning
                    className="mapping-list__icon"
                    alt="Better information for government planning"
                  />
                </div>
                <div className="mapping-list__info-wrapper">
                  <h4 className="mapping-list__title">
                    Better information for government planning
                  </h4>
                  <p className="mapping-list__text">
                    Many national governments do not know where all the schools
                    in their countries are. Without that information, they
                    cannot adequately provide services or deliver resources.
                  </p>
                </div>
              </li>
              <li className="mapping-list__item">
                <div className="mapping-list__icon-wrapper">
                  <IconInvestment
                    className="mapping-list__icon"
                    alt="Smarter infrastructure investment"
                  />
                </div>
                <div className="mapping-list__info-wrapper">
                  <h4 className="mapping-list__title">
                    Smarter infrastructure investment
                  </h4>
                  <p className="mapping-list__text">
                    Without knowing where connectivity needs to be extended,
                    governments and investors don’t know how much it will cost,
                    making it more difficult and riskier to finance.
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
        <h2 className="section__title">Why mapping</h2>
        <div className="partners__row">
          <div className="partners__info">
            <h3 className="partners__title">
              Project Connect’s mission to map the connectivity of every school
              in the world is ambitious and we need your help to succeed.
              Whether you are a government, an international organization, an
              NGO, a tech company, a network provider, a research institution or
              any other entity that supports schools, we want to work with you.
            </h3>
            <button
              type="button"
              className="partners__button button button--primary"
            >
              Join us
            </button>
          </div>
        </div>
        <div className="partners__row">
          <ul className="partners__list partners-list">
            <li className="partners-list__item">
              <LogoItu className="partners-list__image" alt="ITU" />
            </li>
            <li className="partners-list__item">
              <LogoEricsson className="partners-list__image" alt="Ericsson" />
            </li>
            <li className="partners-list__item">
              <LogoFacebook className="partners-list__image" alt="Facebook" />
            </li>
            <li className="partners-list__item">
              <LogoArm className="partners-list__image" alt="ARM" />
            </li>
            <li className="partners-list__item">
              <LogoSoftbank className="partners-list__image" alt="SoftBank" />
            </li>
            <li className="partners-list__item">
              <LogoMaxar className="partners-list__image" alt="Maxar" />
            </li>
            <li className="partners-list__item">
              <LogoLiquid className="partners-list__image" alt="Liquid" />
            </li>
            <li className="partners-list__item">
              <LogoGsma className="partners-list__image" alt="GSMA" />
            </li>
            <li className="partners-list__item">
              <LogoDevelopmentSeed
                className="partners-list__image"
                alt="Development SEED"
              />
            </li>
            <li className="partners-list__item" />
            <li className="partners-list__item" />
            <li className="partners-list__item" />
            <li className="partners-list__item" />
            <li className="partners-list__item" />
          </ul>
        </div>
      </div>
    </section>
  </>
);

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
        <Giga className="footer__logo" alt="Unicef logo" />
        <Unicef className="footer__logo" alt="Giga logo" />
      </footer>
    </div>
  </AppFrame>
);
