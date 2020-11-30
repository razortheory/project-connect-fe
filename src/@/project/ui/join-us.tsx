import { useStore } from 'effector-react';
import React, { FormEvent } from 'react';
import styled from 'styled-components';

import joinUsImage from '~/assets/images/join-us.jpg';
import { joinUs } from '~/core/routes';
import { Link } from '~/lib/router';

import { sendJoinUsFormFx } from '@/project/effects';
import {
  $fullName,
  $fullNameError,
  // eslint-disable-next-line import/named
  $isSendButtonDisabled,
  $organization,
  $organizationError,
  $purpose,
  $purposeError,
  $yourMessage,
  $yourMessageError,
  clearFormFields,
  onFullNameChange,
  onJoinUsFormSubmit,
  onOrganizationChange,
  onPurposeChange,
  onYourMessageChange,
  setFullNameError,
  setOrganizationError,
  setPurposeError,
  setYourMessageError,
} from '@/project/model';

const Error = styled.div`
  /* stylelint-disable scss/operator-no-unspaced */
  position: absolute;
  bottom: -2rem;
  left: 0;
  color: #ec0707;
  font-size: 1.5rem;
  font-family: Cabin, sans-serif;
  letter-spacing: 1px;

  @media (max-width: 991px) {
    font-size: 1.1rem;
  }
`;

const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const minInputLength = 1;
  const minTextAreaLength = 1;
  const maxInputLength = 50;
  const maxTextAreaLength = 250;
  const validateInputOnMinLength = (fieldValue: string) =>
    fieldValue.trim().length >= minInputLength;
  const validateInputOnMaxLength = (fieldValue: string) =>
    fieldValue.length <= maxInputLength;

  if (
    validateInputOnMinLength($fullName.getState()) &&
    validateInputOnMaxLength($fullName.getState()) &&
    validateInputOnMinLength($organization.getState()) &&
    validateInputOnMaxLength($organization.getState()) &&
    validateInputOnMinLength($purpose.getState()) &&
    validateInputOnMaxLength($purpose.getState()) &&
    $yourMessage.getState().trim().length >= minTextAreaLength &&
    $yourMessage.getState().length <= maxTextAreaLength
  ) {
    onJoinUsFormSubmit();
    const result = await sendJoinUsFormFx({
      fullName: $fullName.getState(),
      organization: $organization.getState(),
      purpose: $purpose.getState(),
      yourMessage: $yourMessage.getState(),
    });

    // TODO
    console.log(result);
    setFullNameError('');
    setOrganizationError('');
    setPurposeError('');
    setYourMessageError('');
    clearFormFields();
    return;
  }

  if (!validateInputOnMinLength($fullName.getState())) {
    setFullNameError(`Full Name field is required`);
  } else if (!validateInputOnMaxLength($fullName.getState())) {
    setFullNameError(
      `Full Name  should not be more than ${maxInputLength} characters`
    );
  } else {
    setFullNameError('');
  }

  if (!validateInputOnMinLength($organization.getState())) {
    setOrganizationError(`Organization field is required`);
  } else if (!validateInputOnMaxLength($organization.getState())) {
    setOrganizationError(
      `Organization should not be more than ${maxInputLength} characters`
    );
  } else {
    setOrganizationError('');
  }

  if (!validateInputOnMinLength($purpose.getState())) {
    setPurposeError(`Purpose field is required`);
  } else if (!validateInputOnMaxLength($purpose.getState())) {
    setPurposeError(
      `Purpose should not be more than ${maxInputLength} characters`
    );
  } else {
    setPurposeError('');
  }

  if ($yourMessage.getState().trim().length < minTextAreaLength) {
    setYourMessageError(`Your message field is required`);
  } else if ($yourMessage.getState().length > maxTextAreaLength) {
    setYourMessageError(
      `Your message should not be more than ${maxTextAreaLength} characters`
    );
  } else {
    setYourMessageError('');
  }
};

export const JoinUs = () => {
  const fullName = useStore($fullName);
  const organization = useStore($organization);
  const purpose = useStore($purpose);
  const yourMessage = useStore($yourMessage);
  const fullNameError = useStore($fullNameError);
  const organizationError = useStore($organizationError);
  const purposeError = useStore($purposeError);
  const yourMessageError = useStore($yourMessageError);
  const isSendButtonDisabled = useStore($isSendButtonDisabled);

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
              <h3 className="partnership__title">
                Map school connectivity in your country
              </h3>
              <p className="partnership__description">
                If you are a country government interested in joining, you can
                contact us and we will help you map every school and
                connectivity status in your country.
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
                You can provide funding to support Project Connect’s platform,
                and help other countries get their maps.
              </p>
              <h3 className="partnership__title">
                Contribute with engineering and data science capacity
              </h3>
              <p className="partnership__description">
                Help us build the Project Connect platform and tech solutions to
                accelerate the mapping work globally.
              </p>
              <h3 className="partnership__title">
                Collaborate on joint research
              </h3>
              <p className="partnership__description">
                We can conduct joint research on topics such as the impact of
                connectivity in outcomes, optimization of service delivery or
                deep learning for automatic mapping.
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
              <form
                // Action="mailto:projectconnect@unicef.org"
                // Method="POST"
                encType="text/plain"
                className="feedback__form form"
                onSubmit={onSubmit}
              >
                <div className="form__row">
                  <label htmlFor="name" className="form__item">
                    <p className="form__label">Full Name</p>
                    <input
                      id="name"
                      className={
                        fullNameError === ''
                          ? ['form__input', 'input'].join(' ')
                          : ['form__input', 'input', 'input__error'].join(' ')
                      }
                      type="text"
                      name="name"
                      value={fullName}
                      onChange={onFullNameChange}
                    />
                  </label>
                  {fullNameError !== '' && <Error>{fullNameError}</Error>}
                </div>

                <div className="form__row">
                  <label htmlFor="organization" className="form__item">
                    <p className="form__label">Your organisation</p>
                    <input
                      id="organization"
                      className={
                        organizationError === ''
                          ? ['form__input', 'input'].join(' ')
                          : ['form__input', 'input', 'input__error'].join(' ')
                      }
                      type="text"
                      name="organization"
                      value={organization}
                      onChange={onOrganizationChange}
                    />
                  </label>
                  {organizationError !== '' && (
                    <Error>{organizationError}</Error>
                  )}
                </div>
                <div className="form__row">
                  <label htmlFor="purpose" className="form__item">
                    <p className="form__label">Purpose</p>
                    <input
                      id="purpose"
                      className={
                        purposeError === ''
                          ? ['form__input', 'input'].join(' ')
                          : ['form__input', 'input', 'input__error'].join(' ')
                      }
                      type="text"
                      name="purpose"
                      value={purpose}
                      onChange={onPurposeChange}
                    />
                  </label>
                  {purposeError !== '' && <Error>{purposeError}</Error>}
                </div>
                <div className="form__row">
                  <label htmlFor="message" className="form__item">
                    <p className="form__label">Your message</p>
                    <textarea
                      id="message"
                      className={
                        yourMessageError === ''
                          ? ['form__input', 'textarea'].join(' ')
                          : ['form__input', 'textarea', 'textarea__error'].join(
                              ' '
                            )
                      }
                      name="message"
                      value={yourMessage}
                      onChange={onYourMessageChange}
                    />
                  </label>
                  {yourMessageError !== '' && <Error>{yourMessageError}</Error>}
                </div>
                <button
                  type="submit"
                  className="button button--full-width button--primary"
                  disabled={isSendButtonDisabled}
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
