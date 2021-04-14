import { createEffect } from 'effector';
import { PointLike } from 'mapbox-gl';

import { mapCountry } from '~/core/routes';

import { HandleSchoolClickFx } from '@/popup/types';

const nextTick = async () => new Promise((resolve) => setTimeout(resolve, 0));

export const handleSchoolClickFx = createEffect(
  async ({ map, event, countryCode }: HandleSchoolClickFx) => {
    if (!map) return;

    const bbox: [PointLike, PointLike] = [
      [event.point.x - 10, event.point.y - 10],
      [event.point.x + 10, event.point.y + 10],
    ];

    const features = map.queryRenderedFeatures(bbox, {
      layers: ['schools'],
    });

    if (!features?.length) {
      return;
    }

    await nextTick();

    mapCountry.navigate({
      code: countryCode,
      schoolId: `${features[0]?.id ?? ''}`,
    });
  }
);
