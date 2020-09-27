import { sample } from 'effector';

import { getVoid } from '~/lib/effector-kit';

import { instantScrollFx } from '@/scroll';

import { router } from './routes';

sample({
  source: router.navigate,
  fn: getVoid,
  target: instantScrollFx,
});
