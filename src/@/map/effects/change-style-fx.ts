import { createEffect } from 'effector';

import { styleUrls } from '@/map/constants';
import { Map, Style } from '@/map/types';

export const changeStyleFx = createEffect(
  ({ map, style }: { map: Map; style: Style }) => {
    map.setStyle(styleUrls[style]);
  }
);
