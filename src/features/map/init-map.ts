import mapboxGL from 'mapbox-gl';

import { defaultCenter, defaultZoom, styleUrls } from './constants';
import { changeMap, initMapFx } from './model';
import { InitMapOptions } from './types';

initMapFx.use(async ({ style, container, center, zoom }: InitMapOptions) => {
  return new Promise((resolve) => {
    const map = new mapboxGL.Map({
      style: styleUrls[style],
      center: center ?? defaultCenter,
      zoom: zoom ?? defaultZoom,
      container,
    });

    map.on('load', () => {
      changeMap(map);
      resolve();
    });
  });
});
