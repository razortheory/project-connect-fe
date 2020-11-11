import { getGlobalSchoolsColor } from '@/map/constants';
import { Map, StylePaintData } from '@/map/types';

export const addGlobalSchoolsLayer = ({
  map,
  paintData,
}: {
  map: Map;
  paintData: StylePaintData;
}): void => {
  map.addLayer({
    id: 'schoolsGlobal',
    type: 'circle',
    source: 'schoolsGlobal',
    paint: {
      'circle-radius': {
        stops: [
          [1, 0.5],
          [2, 0.5],
          [3, 0.5],
          [4, 1],
          [12, 2],
        ],
      },
      'circle-color': getGlobalSchoolsColor(paintData),
    },
  });
};
