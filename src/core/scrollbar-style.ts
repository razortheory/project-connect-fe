import { css } from 'styled-components';

export const scrollbarStyleCSS = css`
  /* Component style */
  .scrollbar-container {
    position: relative;
    height: 100%;
  }

  /* Container style */
  .ps {
    /* stylelint-disable-next-line declaration-no-important */
    overflow: hidden !important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
  }

  /* Scrollbar rail styles */
  .ps__rail-x {
    /* please don't change 'position' */
    position: absolute;

    /* there must be 'bottom' or 'top' for ps__rail-x */
    bottom: 0;
    display: none;
    height: 15px;
    opacity: 0%;
    transition: background-color 0.2s linear, opacity 0.2s linear;
  }

  .ps__rail-y {
    /* please don't change 'position' */
    position: absolute;

    /* there must be 'right' or 'left' for ps__rail-y */
    right: 0;
    display: none;
    width: 15px;
    opacity: 0%;
    transition: background-color 0.2s linear, opacity 0.2s linear;
  }

  .ps--active-x > .ps__rail-x,
  .ps--active-y > .ps__rail-y {
    display: block;
    background-color: transparent;
  }

  .ps:hover > .ps__rail-x,
  .ps:hover > .ps__rail-y,
  .ps--focus > .ps__rail-x,
  .ps--focus > .ps__rail-y,
  .ps--scrolling-x > .ps__rail-x,
  .ps--scrolling-y > .ps__rail-y {
    opacity: 50%;
  }

  .ps .ps__rail-x:hover,
  .ps .ps__rail-y:hover,
  .ps .ps__rail-x:focus,
  .ps .ps__rail-y:focus,
  .ps .ps__rail-x.ps--clicking,
  .ps .ps__rail-y.ps--clicking {
    background-color: transparent;
    opacity: 90%;
  }

  /* Scrollbar thumb styles */
  .ps__thumb-x {
    /* please don't change 'position' */
    position: absolute;

    /* there must be 'bottom' for ps__thumb-x */
    bottom: 2px;
    height: 0.5rem;
    background-color: #6e737d;
    border-radius: 5px;
    transition: background-color 0.2s linear, opacity 0.2s linear,
      height 0.2s ease-in-out;
  }

  .ps__thumb-y {
    /* please don't change 'position' */
    position: absolute;

    /* there must be 'right' for ps__thumb-y */
    right: 2px;
    width: 0.5rem;
    background-color: #6e737d;
    border-radius: 5px;
    transition: background-color 0.2s linear, opacity 0.2s linear,
      width 0.2s ease-in-out;
  }

  .ps__rail-x:hover > .ps__thumb-x,
  .ps__rail-x:focus > .ps__thumb-x,
  .ps__rail-x.ps--clicking .ps__thumb-x {
    height: 1rem;
    background-color: #6e737d;
  }

  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    width: 1rem;
    background-color: #6e737d;
  }

  /* MS supports */
  @supports (-ms-overflow-style: none) {
    .ps {
      /* stylelint-disable-next-line declaration-no-important */
      overflow: auto !important;
    }
  }

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .ps {
      /* stylelint-disable-next-line declaration-no-important */
      overflow: auto !important;
    }
  }
`;
