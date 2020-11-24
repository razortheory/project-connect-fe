import clsx from 'clsx';
import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import ColombiaBackground from '~/assets/images/case-studies.jpg';
import IconLeftArrow from '~/assets/images/icon-left-arrow.svg';
import IconRightArrow from '~/assets/images/icon-right-arrow.svg';
import ColombiaSideImage from '~/assets/images/slider-colombia.jpg';

type Slide = {
  title: string;
  content: string;
  backgroundImage?: string;
  sideImage?: string;
};
const SLIDES: Slide[] = [
  {
    title: 'Colombia',
    content:
      'Project Connect applied artificial intelligence techniques to ' +
      'automatically map schools from satellite imagery and provide the ' +
      'government with the locations of 7,000 schools that were not part of ' +
      'their official datasets.',
    sideImage: ColombiaSideImage,
    backgroundImage: ColombiaBackground,
  },
  {
    title: 'Kyrgyzstan',
    content:
      'Project Connect has worked with the Government to build a real-time ' +
      'map of all 2,180 public schools. This map highlighted the 690 schools ' +
      'without internet, helping the Government to focus their initiative ' +
      'to connect every school. Almost every public school in Kyrgyzstan ' +
      'is now connected.' +
      '\nUsing Project Connect mapping, the Kyrgyz Government was able to ' +
      'negotiate lower prices and higher speeds for schools. The price per ' +
      'month reduced to nearly half from $50 to $28.50 and speed was doubled ' +
      'from 2 Mbps to 4 Mbps -- generating about $200,000 USD in savings per ' +
      'year for the education budget.',
  },
  {
    title: 'Kenya',
    content:
      'Project Connect overlaid the location of schools with other datasets to ' +
      'estimate the cost of extending connectivity to every public primary ' +
      'school in the country. This helped unlock the necessary funding to ' +
      'bring connectivity to them.',
  },
  {
    title: 'Sierra Leone',
    content:
      'Project Connect worked with the government to map the distance from ' +
      'communities to schools, which provided insights about the number of ' +
      'out-of-school children and distribution of learning outcome indicators, ' +
      'such as availability of basic infrastructure at schools, learning ' +
      'materials, and teacher training. The analysis exposed that 112,000 ' +
      'students live in areas without mobile coverage. Building from this work, ' +
      'UNICEF is now supporting the government to expand connectivity from ' +
      '80 schools to the remaining >10,000 schools in the country.',
  },
];

export const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((previousState) =>
      previousState === SLIDES.length - 1 ? 0 : previousState + 1
    );
  };
  const previousSlide = () => {
    setSlideIndex((previousState) =>
      previousState === 0 ? SLIDES.length - 1 : previousState - 1
    );
  };
  return (
    <div className="case-studies__row">
      <div className="case-studies__col">
        <SwitchTransition>
          <CSSTransition
            key={slideIndex}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
            classNames="cross-fade"
          >
            <div className="case-studies__slider-wrapper">
              <img
                className="case-studies__slider-background"
                src={
                  SLIDES[slideIndex].backgroundImage ??
                  'http://placehold.it/875x578.png'
                }
                alt=""
              />
              <div className="case-studies__slider slider">
                <div className="slider__image-wrapper">
                  <img
                    key={slideIndex}
                    className="slider__image"
                    src={
                      SLIDES[slideIndex].sideImage ??
                      'http://placehold.it/500x500.png'
                    }
                    alt=""
                  />
                </div>
                <div className="slider__info-wrapper">
                  <div className="slider__title">
                    {SLIDES[slideIndex].title}
                  </div>
                  <p className="slider__text">{SLIDES[slideIndex].content}</p>
                </div>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div className="case-studies__slider-controls">
          <ul className="case-studies__slider-pagination slider-pagination">
            {SLIDES.map((slide, index) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={slide.title}
                className={clsx('slider-pagination__item', {
                  'slider-pagination__item--active': index === slideIndex,
                })}
                onKeyPress={() => {}}
                onClick={(event) => {
                  event.preventDefault();
                  setSlideIndex(index);
                }}
              >
                {slide.title}
              </li>
            ))}
          </ul>
          <div className="case-studies__slider-navigation slider-navigation">
            <button
              type="button"
              className="slider-navigation__button"
              onClick={(event) => {
                event.preventDefault();
                previousSlide();
              }}
            >
              <IconLeftArrow
                className="slider-navigation__icon"
                alt="Go to previous slide"
              />
            </button>
            <button
              type="button"
              className="slider-navigation__button"
              onClick={(event) => {
                event.preventDefault();
                nextSlide();
              }}
            >
              <IconRightArrow
                className="slider-navigation__icon"
                alt="Go to next slide"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
