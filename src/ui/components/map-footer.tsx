import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';

export const MapFooter = () => (
  <footer className="footer">
    <Unicef className="footer__logo" alt="Unicef logo" />
    <Giga className="footer__logo" alt="Giga logo" />
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
    <ul className="footer__map-switcher map-switcher">
      <li className="map-switcher__item map-switcher__item--active">Dark</li>
      <li className="map-switcher__item">Light</li>
      <li className="map-switcher__item">Satellite</li>
      <li className="map-switcher__item">Accessible</li>
    </ul>
    <div className="footer__map-resizer map-resizer">
      <button className="map-resizer__button" type="button">
        <span className="map-resizer__line" />
      </button>
      <button className="map-resizer__button" type="button">
        <span className="map-resizer__line" />
        <span className="map-resizer__line map-resizer__line--vertical" />
      </button>
    </div>
  </footer>
);
