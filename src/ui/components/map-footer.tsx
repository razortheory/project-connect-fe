import { useStore } from 'effector-react';
import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';
import { styles } from '~/features/map/constants';
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

const MapLegend = () => (
  <ul className="footer__map-legend map-legend">
    <li className="map-legend__item map-legend__item--connected">
      School location +connectivity
    </li>
    <li className="map-legend__item map-legend__item--verified">
      School location (verified)
    </li>
    <li className="map-legend__item map-legend__item--not-verified">
      School location (not&nbsp;verified)
    </li>
  </ul>
);

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
  return (
    <footer className="footer">
      <Unicef className="footer__logo" alt="Unicef logo" />
      <Giga className="footer__logo" alt="Giga logo" />
      <MapLegend />
      <MapStyle />
      <MapZoom />
    </footer>
  );
};
