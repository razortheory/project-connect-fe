import { combine, sample } from 'effector';

import { tabControls, tabInfo, tabMap } from '~/core/tab-routes';
import { getInverted, getVoid } from '~/lib/effector-kit';
import { createMediaMatcher } from '~/lib/media-query';

import { changeSearchText } from '@/map/@/sidebar/model';

export const mobileMediaQuery = '(max-width: 768px)';

export const $isMobile = createMediaMatcher(mobileMediaQuery);
export const $isDesktop = $isMobile.map(getInverted);

export const $isMapTab = combine(
  $isMobile,
  tabMap.visible,
  (isMobile, tabMapVisible) => (isMobile ? tabMapVisible : false)
);

export const $isContentTab = combine(
  $isDesktop,
  tabInfo.visible,
  (isDesktop, tabInfoVisible) => isDesktop || tabInfoVisible
);

export const $isControlsTab = combine(
  $isMobile,
  tabControls.visible,
  (isMobile, tabControlsVisible) => isMobile && tabControlsVisible
);

// Navigate to list on search
sample({
  source: changeSearchText,
  fn: getVoid,
  target: tabInfo.redirect,
});
