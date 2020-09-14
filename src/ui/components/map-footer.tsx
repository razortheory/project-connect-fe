import { useStore } from 'effector-react';
import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';
import { mapCountry } from '~/core/routes';
import {
  connectivityStatusPaintData,
  countriesPaintData,
  styles,
} from '~/features/map/constants';
import { $style, changeStyle, zoomIn, zoomOut } from '~/features/map/model';

const MapZoom = () => (
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

const MapLegendForCountries = () => {
  const style = useStore($style);
  const paintData = countriesPaintData[style];
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

const MapLegendForSchools = () => {
  return (
    <ul className="footer__map-legend map-legend">
      <li
        className="map-legend__item"
        style={{ borderTopColor: connectivityStatusPaintData.unknown }}
      >
        Data unavailable
      </li>
      <li
        className="map-legend__item"
        style={{ borderTopColor: connectivityStatusPaintData.no }}
      >
        No connectivity
      </li>
      <li
        className="map-legend__item"
        style={{ borderTopColor: connectivityStatusPaintData.moderate }}
      >
        Moderate
      </li>
      <li
        className="map-legend__item"
        style={{ borderTopColor: connectivityStatusPaintData.good }}
      >
        Good
      </li>
    </ul>
  );
};

const MapStyle = () => {
  const activeStyle = useStore($style);

  return (
    <ul className="footer__map-switcher map-switcher">
      {styles.map((style) => (
        <li
          key={String(style)}
          className={`map-switcher__item
        ${style === activeStyle ? 'map-switcher__item--active' : ''}`}
        >
          <div
            role="button"
            className="map-switcher__button"
            onKeyPress={() => {}}
            onClick={() => changeStyle(style)}
            tabIndex={0}
          >
            {style}
          </div>
        </li>
      ))}
    </ul>
  );
};

export const MapFooter = () => {
  const isCountryView = useStore(mapCountry.visible);

  return (
    <footer className="footer">
      <Unicef className="footer__logo" alt="Unicef logo" />
      <Giga className="footer__logo" alt="Giga logo" />
      {isCountryView ? <MapLegendForSchools /> : <MapLegendForCountries />}
      <MapStyle />
      <MapZoom />
    </footer>
  );
};
