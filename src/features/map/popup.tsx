import { createEvent, guard } from 'effector';
import React from 'react';

import { $popup } from './model';

export const onChangeRef = createEvent<HTMLDivElement | null>();

guard({
  source: onChangeRef,
  filter: Boolean,
  target: $popup,
});

export const Popup = () => <div id="map-school-popup" ref={onChangeRef} />;
