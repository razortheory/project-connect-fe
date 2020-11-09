import { createEffect } from 'effector';

const OFFSET_Y = 50;

const getElementYPosition = (element: Element): number => {
  const elementTop = element.getBoundingClientRect().top;
  return elementTop + window.pageYOffset - OFFSET_Y;
};

const nextTick = async () => new Promise((resolve) => setTimeout(resolve, 200));

const scrollToHash = async (hash: string) => {
  const element = document.querySelector(hash);
  if (!element) return;
  const positionY = getElementYPosition(element);

  await nextTick();
  const nextPositionY = getElementYPosition(element);

  if (nextPositionY === positionY) {
    window.scrollTo({
      top: positionY,
      left: 0,
      behavior: 'smooth',
    });
  } else {
    await scrollToHash(hash);
  }
};

export const scrollToHashFx = createEffect(scrollToHash);
