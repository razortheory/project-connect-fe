import { createEvent, createStore } from 'effector';
import mapboxGL from 'mapbox-gl';

export const changeIsOpenPopup = createEvent<boolean>();

export const $popup = createStore<mapboxGL.Popup | null>(null);
export const $isOpenPopup = createStore(false);
