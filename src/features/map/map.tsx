import 'mapbox-gl/dist/mapbox-gl.css';

import { createEvent, guard, sample } from 'effector';
import mapboxGL from 'mapbox-gl';
import React, { CSSProperties } from 'react';

import { API_MAPBOX_ACCESS_TOKEN } from '~/env';

import { $style, initMap } from './model';

mapboxGL.accessToken = API_MAPBOX_ACCESS_TOKEN;

const onChangeRef = createEvent<HTMLDivElement | null>();

sample({
  source: $style,
  clock: guard(onChangeRef, { filter: Boolean }),
  fn: (style, container) => ({ style, container }),
  target: initMap,
});

const mapStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 1,
};

export const Map = () => <div id="map" ref={onChangeRef} style={mapStyles} />;
