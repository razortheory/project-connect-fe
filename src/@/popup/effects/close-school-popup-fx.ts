import { createEffect } from 'effector';
import mapboxGl from 'mapbox-gl';

import { mapCountry } from '~/core/routes';

export const closeSchoolPopupFx = createEffect(
  ({
    countryCode,
    popup,
  }: {
    countryCode: string;
    popup: mapboxGl.Popup | null;
  }) => {
    popup?.remove();

    mapCountry.navigate({ code: countryCode });
  }
);
