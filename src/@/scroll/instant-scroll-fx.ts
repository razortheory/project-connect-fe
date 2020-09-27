import { createEffect } from 'effector';

import { InstantScrollOptions } from './types';

const nextTick = async () => new Promise((resolve) => setTimeout(resolve, 0));

export const instantScrollFx = createEffect(
  async ({ top = 0, left = 0 }: InstantScrollOptions = {}) => {
    const style = document.createElement('style');
    const css = 'html { scroll-behavior: auto !important }';
    style.append(document.createTextNode(css));
    document.head.append(style);
    await nextTick();
    window.scroll({ top, left, behavior: 'auto' });
    style.remove();
  }
);
