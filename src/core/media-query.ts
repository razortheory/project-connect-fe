import { getInverted } from '~/lib/effector-kit';
import { createMediaMatcher } from '~/lib/media-query';

export const mobileMediaQuery = '(max-width: 768px)';

export const $isMobile = createMediaMatcher(mobileMediaQuery);
export const $isDesktop = $isMobile.map(getInverted);
