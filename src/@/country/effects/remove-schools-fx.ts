import { createEffect } from 'effector';

import { Map } from '@/map/types';

export const removeSchoolsFx = createEffect((map: Map) => {
  if (map.getLayer('schools')) {
    map.removeLayer('schools');
  }

  if (map.getSource('schools')) {
    map.removeSource('schools');
  }
});
