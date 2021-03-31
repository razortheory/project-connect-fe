import 'mapbox-gl/dist/mapbox-gl.css';

import { createEvent, guard, sample } from 'effector';
import React, { CSSProperties } from 'react';

import { initMapFx } from '@/map/effects';
import { $style } from '@/map/model';

const onMapRef = createEvent<HTMLDivElement | null>();

sample({
  source: $style,
  clock: guard(onMapRef, { filter: Boolean }),
  fn: (style, container) => ({ style, container }),
  target: initMapFx,
});

const mapStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 1,
};

export const Map = () => <div id="map" ref={onMapRef} style={mapStyles} />;
