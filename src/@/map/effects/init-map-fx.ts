import { createEffect } from 'effector';
import mapboxGL from 'mapbox-gl';

import { defaultCenter, defaultZoom, styleUrls } from '@/map/constants';
import { changeMap } from '@/map/model';
import { InitMapOptions } from '@/map/types';

export const initMapFx = createEffect(
  ({ style, container, center, zoom }: InitMapOptions) => {
    const map = new mapboxGL.Map({
      style: styleUrls[style],
      center: center ?? defaultCenter,
      zoom: zoom ?? defaultZoom,
      container,
    });

    map.on('load', () => {
      changeMap(map);
    });
  }
);
