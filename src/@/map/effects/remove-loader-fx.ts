import { createEffect } from 'effector';

import { Marker } from '@/map/types';

export const removeLoaderFromMapFx = createEffect((loader: Marker | null) => {
  loader?.remove();
});
