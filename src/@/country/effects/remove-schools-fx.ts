import { createEffect } from 'effector';

import { Map } from '@/map/types';

export const removeSchoolsFx = createEffect((map: Map) => {
  map.off('mouseenter', 'schools', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = 'pointer';
  });
  map.off('mouseleave', 'schools', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = '';
  });

  if (map.getLayer('schools')) {
    map.removeLayer('schools');
  }

  if (map.getSource('schools')) {
    map.removeSource('schools');
  }
});
