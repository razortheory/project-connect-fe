import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';
import { AppFrame } from '~/core';

export const ProjectPage = () => (
  <AppFrame>
    <div className="app app--inner">
      <header className="header">
        <div className="container-fluid">
          <a href="/" className="header__logo logo">
            Project&nbsp;connect
          </a>
          <nav className="header__nav">
            <ul className="menu">
              <li className="menu__item">
                <a href="/" className="menu__link">
                  About
                </a>
                <ul className="menu">
                  <li className="menu__item">
                    <a href="/" className="menu__link">
                      Second level
                    </a>
                  </li>
                  <li className="menu__item">
                    <a href="/" className="menu__link">
                      Second level 2
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu__item">
                <a href="/" className="menu__link">
                  Country progress
                </a>
              </li>
              <li className="menu__item">
                <a href="/" className="menu__link">
                  Data sharing & privacy
                </a>
              </li>
              <li className="menu__item">
                <a href="/" className="menu__link">
                  Media
                </a>
              </li>
              <li className="menu__item">
                <a href="/" className="menu__link">
                  Join us
                </a>
              </li>
            </ul>
          </nav>
          <a href="/" className="header__button button button--primary">
            Project info
          </a>
        </div>
      </header>
      <main className="content">
        <section className="section">
          <div className="container">
            <div className="page-heading">
              <h2 className="page-heading__title">
                Countries have been listed below with real-time updates on their
                progress with school mapping. The key metric that is used to
                evaluate project progress is the stage of mapping and the
                percentage of schools mapped.{' '}
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
                  We are looking for information on locations of schools and
                  their level of online connectivity. However, any piece of
                  information about schools that you are interested in sharing,
                  no matter how small, is extremely useful.
                </p>
                <h3 className="partnership__title">Share your data</h3>
                <p className="partnership__description">
                  We are looking for information on locations of schools and
                  their level of online connectivity. However, any piece of
                  information about schools that you are interested in sharing,
                  no matter how small, is extremely useful.
                </p>
                <h3 className="partnership__title">Share your data</h3>
                <p className="partnership__description">
                  We are looking for information on locations of schools and
                  their level of online connectivity. However, any piece of
                  information about schools that you are interested in sharing,
                  no matter how small, is extremely useful.
                </p>
                <h3 className="partnership__title">Share your data</h3>
                <p className="partnership__description">
                  We are looking for information on locations of schools and
                  their level of online connectivity. However, any piece of
                  information about schools that you are interested in sharing,
                  no matter how small, is extremely useful.
                </p>
              </div>
            </div>
          </div>
        </section>
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
                    Educating children during the times of a pandemic: how can
                    we work together to connect schools to the internet
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
                    Educating children during the times of a pandemic: how can
                    we work together to connect schools to the internet
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
                    Educating children during the times of a pandemic: how can
                    we work together to connect schools to the internet
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
                    Educating children during the times of a pandemic: how can
                    we work together to connect schools to the internet
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Giga className="footer__logo" title="Unicef logo" />
        <Unicef className="footer__logo" title="Giga logo" />
      </footer>
    </div>
  </AppFrame>
);
