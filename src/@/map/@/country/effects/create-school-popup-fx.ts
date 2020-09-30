import { createEffect } from 'effector';
import mapboxGL from 'mapbox-gl';

export const createSchoolPopupFx = createEffect(
  () =>
    new mapboxGL.Popup({
      maxWidth: '100%',
      className: 'country-popup', // TODO: Rename to school-popup
      anchor: 'center',
    })
);
