/* eslint-disable @typescript-eslint/naming-convention */
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import React from 'react';

import AboutMedia from '~/assets/images/about-media.jpg';
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
import { formatPercent } from '~/core/formatters';
import { joinUs } from '~/core/routes';
import { humanFormat } from '~/lib/human-format';
import { Link } from '~/lib/router';

import { $isLoading } from '@/dashboard/model';
import { defaultGlobalStats } from '@/map/constants';
import { $globalStats } from '@/map/model';

export const onAboutRef = createEvent<HTMLDivElement | null>();

const AboutContent = () => {
  const { schools_mapped, percent_schools_without_connectivity } = useStore(
    $globalStats
  );

  return (
    <div ref={onAboutRef}>
      <section className="section" id="introduction">
        <div className="container">
          <div className="page-heading">
            <h2 className="page-heading__title">
              Countries have been listed below with real-time updates on their
              progress with school mapping. The key metric that is used to
              evaluate project progress is the stage of mapping and the
              percentage of schools mapped.
            </h2>
            <div className="page-heading__media">
              <div className="page-heading__image-wrapper">
                <img
                  className="page-heading__image"
                  src={AboutMedia}
                  alt="countries-dashboard"
                />
              </div>
              <div className="page-heading__info">
                <ul className="info-list info-list--heading">
                  <li className="info-list__item">
                    <p className="info-list__description">
                      {humanFormat(schools_mapped)}
                    </p>
                    <h3 className="info-list__title">Schools mapped</h3>
                  </li>
                  <li className="info-list__item">
                    <p className="info-list__description">
                      {formatPercent(percent_schools_without_connectivity)}
                    </p>
                    <h3 className="info-list__title">
                      Schools without internet
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section case-studies" id="case-studies">
        <div className="container">
          <a href="#case-studies">
            <h2 className="section__title">Case studies</h2>
          </a>
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
                      automatically map schools from satellite imagery and
                      provide the government the location of 7,000 schools that
                      were not part of their official datasets.
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
      <section className="section mapping" id="why-mapping">
        <div className="container">
          <a href="#why-mapping">
            <h2 className="section__title">Why mapping</h2>
          </a>
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
                education and internet translates to exclusion, fewer resources
                to learn and grow, and limited opportunities for the most
                vulnerable children and youth. But without answers to these
                questions, we can’t change that.
              </p>
              <h3 className="mapping__title">In response</h3>
              <p className="mapping__text">
                UNICEF is mapping the location and real-time internet connection
                of every school in the world. This map, hosted on an open data
                platform, is helping governments and partners eliminate the
                digital divide globally. To date, 800,000 schools in 25
                countries have been mapped and the number continues to grow at
                an accelerated pace.
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
                      ability to monitor whether schools are connected and
                      where.
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
                      It has been proven that availability and quality of data
                      is considerably higher for wealthier regions. This data
                      inequity leads to disparities in resource allocation,
                      where vulnerable populations are left behind.
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
                      the size of potential new customers, they struggle to make
                      a case for bringing infrastructure to remote areas. This
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
                      Many national governments do not know where all the
                      schools in their countries are. Without that information,
                      they cannot adequately provide services or deliver
                      resources.
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
                      governments and investors don’t know how much it will
                      cost, making it more difficult and riskier to finance.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section mapping" id="our-partners">
        <div className="container">
          <a href="#our-partners">
            <h2 className="section__title">Our partners</h2>
          </a>
          <div className="partners__row">
            <div className="partners__info">
              <h3 className="partners__title">
                Project Connect’s mission to map the connectivity of every
                school in the world is ambitious and we need your help to
                succeed. Whether you are a government, an international
                organization, an NGO, a tech company, a network provider, a
                research institution or any other entity that supports schools,
                we want to work with you.
              </h3>
              <Link
                to={joinUs}
                className="partners__button button button--primary"
              >
                Join us
              </Link>
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
    </div>
  );
};

export const About = () => {
  const globalStats = useStore($globalStats);
  const noData = globalStats === defaultGlobalStats;

  return useStore($isLoading) || noData ? (
    <section className="section">
      <div className="container">
        <h1>Loading...</h1>
      </div>
    </section>
  ) : (
    <>
      <AboutContent />
    </>
  );
};
