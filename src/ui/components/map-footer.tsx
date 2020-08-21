import { useStore } from 'effector-react';
import React from 'react';

import Giga from '~/assets/images/giga-logo-footer.svg';
import Unicef from '~/assets/images/unicef-logo-footer.svg';
import {
  $mapTheme,
  changeMapTheme,
  decrementZoom,
  incrementZoom,
  MapTheme,
} from '~/features/map/model';

export const MapFooter = () => {
  const activeTheme = useStore($mapTheme);

  const getMapSwitcherItem = (themeName: MapTheme) => (
    <li
      key={themeName}
      className={`map-switcher__item
        ${themeName === activeTheme ? 'map-switcher__item--active' : ''}`}
    >
      <div
        role="button"
        className="map-switcher__button"
        onKeyPress={() => {}}
        onClick={() => changeMapTheme(themeName)}
        tabIndex={0}
      >
        {themeName}
      </div>
    </li>
  );

  const mapThemes: MapTheme[] = ['dark', 'light', 'satellite', 'accessible'];
  const mapSwitcherItems = mapThemes.map((themeName: MapTheme) =>
    getMapSwitcherItem(themeName)
  );

  return (
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
      <ul className="footer__map-switcher map-switcher">{mapSwitcherItems}</ul>
      <div className="footer__map-resizer map-resizer">
        <button
          className="map-resizer__button"
          type="button"
          onClick={() => decrementZoom()}
        >
          <span className="map-resizer__line" />
        </button>
        <button
          className="map-resizer__button"
          type="button"
          onClick={() => incrementZoom()}
        >
          <span className="map-resizer__line" />
          <span className="map-resizer__line map-resizer__line--vertical" />
        </button>
      </div>
    </footer>
  );
};
