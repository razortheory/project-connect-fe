import { sample } from 'effector';

import { getVoid, setPayload } from '~/lib/effector-kit';

import { initMapFx } from '@/map/effects';
import { createSchoolPopupFx } from '@/popup/effects';
import { $isOpenPopup, $popup, changeIsOpenPopup } from '@/popup/model';

$isOpenPopup.on(changeIsOpenPopup, setPayload);

// Create school popup
sample({
  source: initMapFx.done,
  fn: getVoid,
  target: createSchoolPopupFx,
});

sample({
  source: createSchoolPopupFx.doneData,
  target: $popup,
});
