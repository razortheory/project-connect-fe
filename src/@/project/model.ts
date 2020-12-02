import { createEvent, createStore } from 'effector';

import { setPayload } from '~/lib/effector-kit';

export const toggleMenu = createEvent();

export const $isMenuOpen = createStore(false);

export const $joinUsTabState = createStore<
  | 'default'
  | 'government'
  | 'non-profit'
  | 'international-organization'
  | 'development-bank'
  | 'ISP'
  | 'tech-company'
  | 'research-institute'
>('default');
export const clickJoinTab = createEvent<
  | 'default'
  | 'government'
  | 'non-profit'
  | 'international-organization'
  | 'development-bank'
  | 'ISP'
  | 'tech-company'
  | 'research-institute'
>();

$joinUsTabState.on(clickJoinTab, setPayload);
