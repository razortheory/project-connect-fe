import { createEvent, createStore } from 'effector';

export const $isDotsPopupOpen = createStore(false);

export const setIsOpenDotsPopup = createEvent<boolean>();
