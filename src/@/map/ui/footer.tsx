import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import Unicef from '~/assets/images/unicef-logo-map-footer.svg';
import { mapCountry } from '~/core/routes';

import { styles } from '@/map/constants';
import {
  $pending,
  $style,
  $stylePaintData,
  changeStyle,
  zoomIn,
  zoomOut,
} from '@/map/model';

const ZoomControl = () => (
  <div className="footer__map-resizer map-resizer">
    <button
      className="map-resizer__button"
      type="button"
      onClick={() => zoomOut()}
    >
      <span className="map-resizer__line" />
    </button>
    <button
      className="map-resizer__button"
      type="button"
      onClick={() => zoomIn()}
    >
      <span className="map-resizer__line" />
      <span className="map-resizer__line map-resizer__line--vertical" />
    </button>
  </div>
);

const LegendForCountries = () => {
  const paintData = useStore($stylePaintData);

  return (
    <ul className="footer__map-legend map-legend">
      <li
        className="map-legend__item"
        style={{ borderTopColor: paintData.countryWithConnectivity }}
      >
        School location +connectivity
      </li>
      <li
        className="map-legend__item"
        style={{ borderTopColor: paintData.countryVerified }}
      >
        School location (verified)
      </li>
      <li
        className="map-legend__item"
        style={{ borderTopColor: paintData.countryNotVerified }}
      >
        School location (not&nbsp;verified)
      </li>
    </ul>
  );
};

const LegendForSchools = () => {
  const paintData = useStore($stylePaintData);
  return (
    <ul className="footer__map-legend map-legend">
      <li
        className="map-legend__item map-legend__item--has-tooltip"
        style={{ borderTopColor: paintData.schoolConnectivity.unknown }}
      >
        Data unavailable
        <div className="map-legend__tooltip tooltip tooltip--dark">
          Internet speed <strong>unknown</strong>
        </div>
      </li>
      <li
        className="map-legend__item map-legend__item--has-tooltip"
        style={{ borderTopColor: paintData.schoolConnectivity.no }}
      >
        No connectivity
        <div className="map-legend__tooltip tooltip tooltip--dark">
          Internet speed <strong>0 mb/s</strong>
        </div>
      </li>
      <li
        className="map-legend__item map-legend__item--has-tooltip"
        style={{ borderTopColor: paintData.schoolConnectivity.moderate }}
      >
        Moderate
        <div className="map-legend__tooltip tooltip tooltip--dark">
          Internet speed <strong>0.5-3 mb/s</strong>
        </div>
      </li>
      <li
        className="map-legend__item map-legend__item--has-tooltip"
        style={{ borderTopColor: paintData.schoolConnectivity.good }}
      >
        Good
        <div className="map-legend__tooltip tooltip tooltip--dark">
          Internet speed <strong>Above 3 mb/s</strong>
        </div>
      </li>
    </ul>
  );
};

const StyleControl = () => {
  const activeStyle = useStore($style);
  const pending = useStore($pending);

  return (
    <ul className="footer__map-switcher map-switcher">
      {styles.map((style) => (
        <li
          key={String(style)}
          className={clsx('map-switcher__item', {
            'map-switcher__item--active': style === activeStyle,
            'map-switcher__item--disabled': pending,
          })}
        >
          <div
            role="button"
            className="map-switcher__button"
            onKeyPress={() => {}}
            onClick={() => {
              if (!pending) {
                changeStyle(style);
              }
            }}
            tabIndex={0}
          >
            {style}
          </div>
        </li>
      ))}
    </ul>
  );
};

export const Footer = () => {
  const isCountryView = useStore(mapCountry.visible);

  return (
    <footer className="footer">
      <Unicef
        className="footer__logo"
        width="68"
        height="17"
        alt="Unicef logo"
      />
      <Giga
        className="footer__logo giga__logo"
        width="56"
        height="26"
        alt="Giga logo"
      />
      {isCountryView ? <LegendForSchools /> : <LegendForCountries />}
      <StyleControl />
      <ZoomControl />
    </footer>
  );
};
