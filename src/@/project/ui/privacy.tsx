import { createEvent } from 'effector';
import React from 'react';

import ImageDataSharing1 from '~/assets/images/data-sharing-1.jpg';
import ImageDataSharing2 from '~/assets/images/data-sharing-2.jpg';
import IconDataCollection from '~/assets/images/icon-data-collection.svg';
import IconMachineLearning from '~/assets/images/icon-machine-learning.svg';
import IconMeasurement from '~/assets/images/icon-measurement.svg';
import IconPartnerships from '~/assets/images/icon-partnerships.svg';

export const onPrivacyRef = createEvent<HTMLDivElement | null>();

export const Privacy = () => {
  return (
    <div ref={onPrivacyRef}>
      <section className="section mapping">
        <div className="container" id="methods">
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
                There is no single approach that will allow us to achieve it.
                Our strategy is to combine a variety of methods to build full,
                live maps that have never existed before.
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
                    <h4 className="mapping-list__title">Machine Learning</h4>
                    <p className="mapping-list__text">
                      We train machine learning algorithms to identify features
                      of schools based on high-resolution satellite imagery.
                      This allows us to map new schools, validate the accuracy
                      of existing school location data, and automatically update
                      maps when school locations change in the future.
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
                      As part of UNICEF, Project Connect is in a unique position
                      to partner with both government and the private sector to
                      develop a better map than either have individually. We
                      partner with Ministries of Education and Ministries of
                      Information and Communications Technology, as well as
                      mobile network operators, internet service providers, and
                      other tech companies, to develop an open source dataset
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
                      To obtain periodical updates on the quality of service of
                      the intern as schools and create a live map of
                      connectivity, we work with governments to deploy
                      measurement tools in connected schools. Depending on the
                      context, we have deployed both hardware- and
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
                      governments and communities to develop datasets from the
                      ground up. Our team has developed a number of tools and
                      strategies to gather or crowdsource missing data and
                      support governments with these assets to locate schools
                      and evaluate connectivity status.
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
                data about the quality of each school’s connectivity. The goal
                of this is to provide open information that can improve
                educational outcomes for all children. As part of this mission,
                Project Connect is centered around three core principles:
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
                      Public data gathered with public money creates public
                      goods
                    </h4>
                    <p className="mapping-list__text">
                      Digital cooperation is a key enabler of Project Connect’s
                      mission and is reflected in the priorities of many
                      organizations, including the recommendations of the
                      Secretary General’s High-Level Panel on Digital
                      Cooperation.
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
                      School location data is a public good that should be
                      shared
                    </h4>
                    <p className="mapping-list__text">
                      The ability to know where education and other foundational
                      resources can be found is a public good, similar to any
                      health center or government building. In most places where
                      data exists, school locations are already shared publicly
                      on sites like Google Maps, 2GIS, and OpenStreetMaps.
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
                      Project Connect adheres to UNICEF’s Child Data Protection
                      Policies and follows the Principles of Responsible Data
                      for Children. Our maps aim to provide information that can
                      have a positive impact without putting children at risk.
                      For more information on our child protection policies,
                      please contact us to request our full Data Sharing and
                      Privacy Framework.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
