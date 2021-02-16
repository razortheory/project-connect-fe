import '@/map/init';
import '@/country/init';
import '@/sidebar/init';
import '@/dashboard/init';
import '@/history-modal/init';
import '@/popup/init';
import '@/project/init';
import '@/setDotsSize/init';

import { guard } from 'effector';

import { getInverted, getVoid } from '~/lib/effector-kit';
import { ToLocation } from '~/lib/router/types';

import { instantScrollFx, scrollToHashFx } from '@/scroll';

import { router } from './routes';

const getHash = (toLocation: ToLocation) =>
  // eslint-disable-next-line no-nested-ternary
  typeof toLocation === 'object' && typeof toLocation.to === 'object'
    ? toLocation.to.hash
    : typeof toLocation === 'string' && toLocation.includes('#')
    ? toLocation.replace(/^.*#/, '#')
    : undefined;

guard({
  source: router.navigate.map(getHash),
  filter: Boolean,
  target: scrollToHashFx,
});

guard({
  source: router.navigate.map(getHash),
  filter: getInverted,
  target: instantScrollFx.prepend(getVoid),
});
