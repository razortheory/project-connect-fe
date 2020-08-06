import { createEffect, createEvent, createStore } from 'effector';

export const toggle = createEvent<void>();
export const tickFx = createEffect<void, void>();
export const $timerWorking = createStore(false);
export const $timer = createStore(0);
