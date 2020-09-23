import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import { joinUs, router } from '~/core/routes';

import { $isLoading } from '@/project/@/dashboard/model';

import { scrollToAnchor } from './helpers';

export const JoinUs = () => {
  const isLoading = useStore($isLoading);

  useEffect(() => {
    joinUs.visible.watch((visible) => {
      if (visible && !isLoading) {
        scrollToAnchor(router.hash.defaultState);
      }
    });
  }, [isLoading]);

  return (
    <>
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
              <form action="" className="feedback__form form">
                <div className="form__row">
                  <label htmlFor="name" className="form__item">
                    <p className="form__label">Full Name</p>
                    <input
                      id="name"
                      className="form__input input"
                      type="text"
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
                    />
                  </label>
                </div>
                <div className="form__row">
                  <label htmlFor="message" className="form__item">
                    <p className="form__label">Your message</p>
                    <textarea id="message" className="form__input textarea" />
                  </label>
                </div>
                <button
                  type="button"
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
