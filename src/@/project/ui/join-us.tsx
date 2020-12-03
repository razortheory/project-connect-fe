import clsx from 'clsx';
import React, { useState } from 'react';

import joinUsImage from '~/assets/images/join-us.jpg';
import { joinUs } from '~/core/routes';
import { Link } from '~/lib/router';

export const JoinUsTabContent = ({ state }: { state?: string }) => {
  return (
    <>
      {state === 'default' && (
        <div className="partnership__tab-content">
          <div className="partnership__arrow-wrapper">
            <div className="partnership__arrow" />
          </div>

          <div className="partnership__default-description">
            Select your organisation type to see how we can work together
          </div>
        </div>
      )}

      {state !== 'default' && (
        <div className="partnership__tab-content">
          <h3 className="partnership__title">
            Map school connectivity in your country
          </h3>
          <p className="partnership__description">
            If you are a country government interested in joining, you can
            contact us and we will help you map every school and connectivity
            status in your country.
          </p>
          <h3 className="partnership__title">Share your data</h3>
          <p className="partnership__description">
            We are looking for information on locations of schools and their
            level of online connectivity. However, any piece of information
            about schools that you are interested in sharing, no matter how
            small, is extremely useful.
          </p>
          <h3 className="partnership__title">Provide funding</h3>
          <p className="partnership__description">
            You can provide funding to support Project Connect’s platform, and
            help other countries get their maps.
          </p>
          <h3 className="partnership__title">
            Contribute with engineering and data science capacity
          </h3>
          <p className="partnership__description">
            Help us build the Project Connect platform and tech solutions to
            accelerate the mapping work globally.
          </p>
          <h3 className="partnership__title">Collaborate on joint research</h3>
          <p className="partnership__description">
            We can conduct joint research on topics such as the impact of
            connectivity in outcomes, optimization of service delivery or deep
            learning for automatic mapping.
          </p>
        </div>
      )}
    </>
  );
};

export const JoinUs = () => {
  const [joinUpTabState, setJoinUpTabState] = useState<
    | 'default'
    | 'government'
    | 'non-profit'
    | 'international-organization'
    | 'development-bank'
    | 'ISP'
    | 'tech-company'
    | 'research-institute'
  >('default');

  const clickJoinTab = (
    value:
      | 'default'
      | 'government'
      | 'non-profit'
      | 'international-organization'
      | 'development-bank'
      | 'ISP'
      | 'tech-company'
      | 'research-institute'
  ) => {
    setJoinUpTabState(value);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="page-heading">
            <h2 className="page-heading__title">
              Project Connect’s mission to map the connectivity of every school
              in the world is ambitious and we need your help to succeed. There
              are a multitude of ways in which we can work together. Interested
              in joining?
            </h2>
            <div className="page-heading__media">
              <div className="page-heading__image-wrapper">
                <img
                  className="page-heading__image"
                  src={joinUsImage}
                  alt="countries-dashboard"
                />
              </div>
            </div>
          </div>
          <Link
            to={joinUs}
            hash="write-to-us"
            className="header__button button button--primary"
          >
            Write to us
          </Link>
        </div>
      </section>
      <section className="section section--inverted">
        <h2 className="visually-hidden">Partner with us</h2>
        <div className="container partnership">
          <div className="partnership__row">
            <div className="partnership__tabs-list">
              <button
                name="government"
                type="button"
                className={clsx(
                  'partnership__button',
                  'button',
                  'button--large',
                  'button--tertiary',
                  {
                    partnership__button__active:
                      joinUpTabState === 'government',
                  }
                )}
                onClick={() => clickJoinTab('government')}
              >
                Government
              </button>
              <button
                name="non-profit"
                type="button"
                className={clsx(
                  'partnership__button',
                  'button',
                  'button--large',
                  'button--tertiary',
                  {
                    partnership__button__active:
                      joinUpTabState === 'non-profit',
                  }
                )}
                onClick={() => clickJoinTab('non-profit')}
              >
                Non-profit or similar
              </button>
              <button
                name="international-organization"
                type="button"
                className={clsx(
                  'partnership__button',
                  'button',
                  'button--large',
                  'button--tertiary',
                  {
                    partnership__button__active:
                      joinUpTabState === 'international-organization',
                  }
                )}
                onClick={() => clickJoinTab('international-organization')}
              >
                International organization
              </button>
              <button
                name="development-bank"
                type="button"
                className={clsx(
                  'partnership__button',
                  'button',
                  'button--large',
                  'button--tertiary',
                  {
                    partnership__button__active:
                      joinUpTabState === 'development-bank',
                  }
                )}
                onClick={() => clickJoinTab('development-bank')}
              >
                Development bank
              </button>
              <button
                name="ISP"
                type="button"
                className={clsx(
                  'partnership__button',
                  'button',
                  'button--large',
                  'button--tertiary',
                  {
                    partnership__button__active: joinUpTabState === 'ISP',
                  }
                )}
                onClick={() => clickJoinTab('ISP')}
              >
                ISP or Network provider
              </button>
              <button
                name="tech-company"
                type="button"
                className={clsx(
                  'partnership__button',
                  'button',
                  'button--large',
                  'button--tertiary',
                  {
                    partnership__button__active:
                      joinUpTabState === 'tech-company',
                  }
                )}
                onClick={() => clickJoinTab('tech-company')}
              >
                tech company
              </button>
              <button
                name="research-institute"
                type="button"
                className={clsx(
                  'partnership__button',
                  'button',
                  'button--large',
                  'button--tertiary',
                  {
                    partnership__button__active:
                      joinUpTabState === 'research-institute',
                  }
                )}
                onClick={() => clickJoinTab('research-institute')}
              >
                research institute
              </button>
            </div>

            <JoinUsTabContent state={joinUpTabState} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container feedback">
          <a href="#write-to-us" id="write-to-us">
            <h2 className="section__title">Write to us</h2>
          </a>
          <div className="feedback__row">
            <div className="feedback__col">
              <h3 className="feedback__title">
                Drop us a few lines about how you would like to engage with us.
              </h3>
              <form
                action="mailto:projectconnect@unicef.org"
                method="POST"
                encType="text/plain"
                className="feedback__form form"
              >
                <div className="form__row">
                  <label htmlFor="name" className="form__item">
                    <p className="form__label">Full Name</p>
                    <input
                      id="name"
                      className="form__input input"
                      type="text"
                      name="name"
                    />
                  </label>
                </div>
                <div className="form__row">
                  <label htmlFor="organization" className="form__item">
                    <p className="form__label">Your organisation</p>
                    <input
                      id="organization"
                      className="form__input input"
                      type="text"
                      name="organization"
                    />
                  </label>
                </div>
                <div className="form__row">
                  <label htmlFor="purpose" className="form__item">
                    <p className="form__label">Purpose</p>
                    <input
                      id="purpose"
                      className="form__input input"
                      type="text"
                      name="purpose"
                    />
                  </label>
                </div>
                <div className="form__row">
                  <label htmlFor="message" className="form__item">
                    <p className="form__label">Your message</p>
                    <textarea
                      id="message"
                      className="form__input textarea"
                      name="message"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="button button--full-width button--primary"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
