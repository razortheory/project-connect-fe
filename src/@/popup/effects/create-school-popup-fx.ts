import { createEffect } from 'effector';
import mapboxGL from 'mapbox-gl';

import { changeIsOpenPopup } from '@/popup/model';

export const createSchoolPopupFx = createEffect(() =>
  new mapboxGL.Popup({
    maxWidth: '100%',
    className: 'school-popup',
    anchor: 'bottom',
  })
    .on('open', () => changeIsOpenPopup(true))
    .on('close', () => changeIsOpenPopup(false))
);
