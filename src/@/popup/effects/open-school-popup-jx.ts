import { createEffect } from 'effector';
import { FeatureCollection, Point } from 'geojson';
import mapboxGl from 'mapbox-gl';

import { mapCountry } from '~/core/routes';

import { Map } from '@/map/types';

const nextTick = async () => new Promise((resolve) => setTimeout(resolve, 0));

export const openSchoolPopupFx = createEffect(
  async ({
    popup,
    schools,
    schoolId,
    map,
    countryCode,
  }: {
    popup: mapboxGl.Popup | null;
    schools: FeatureCollection | null;
    schoolId: number;
    map: Map | null;
    countryCode: string;
  }) => {
    if (!map || !popup || !schools || !schoolId) {
      return;
    }

    const geometry = schools.features.find((school) => school.id === schoolId)
      ?.geometry as Point;

    if (!geometry) {
      mapCountry.navigate({ code: countryCode });
    }

    const { coordinates } = geometry;

    // Fix bug when popup closes and new one doesn't open
    await nextTick();

    // Open new popup
    popup.setLngLat([coordinates[0], coordinates[1]]).addTo(map);
  }
);
