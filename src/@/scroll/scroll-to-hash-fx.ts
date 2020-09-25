import { createEffect } from 'effector';

export const scrollToHashFx = createEffect((hash: string) => {
  const element = document.querySelector(hash);
  element?.scrollIntoView({ behavior: 'smooth' });
});
