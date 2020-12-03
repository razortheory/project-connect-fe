import { createEvent, createStore } from 'effector';

export const toggleMenu = createEvent();

export const $isMenuOpen = createStore(false);
