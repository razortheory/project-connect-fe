import { setPayload } from '~/lib/effector-kit';

import { $isDotsPopupOpen, setIsOpenDotsPopup } from '@/setDotsSize/model';

$isDotsPopupOpen.on(setIsOpenDotsPopup, setPayload);
