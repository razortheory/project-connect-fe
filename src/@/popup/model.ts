import { createEvent, createStore } from 'effector';
import mapboxGL, { MapMouseEvent } from 'mapbox-gl';

import { DailyStats, School } from '~/api/types';

export const changeIsOpenPopup = createEvent<boolean>();
export const changeSchoolId = createEvent<number>();
export const clickSchool = createEvent<MapMouseEvent>();
export const nextSchoolOnPoint = createEvent();
export const previousSchoolOnPoint = createEvent();
export const handleClosePopup = createEvent();

export const $popup = createStore<mapboxGL.Popup | null>(null);
export const $schoolId = createStore(0);
export const $school = createStore<School | null>(null);
export const $isOpenPopup = createStore(false);
export const $schoolsOnPoint = createStore<number[]>([]);
export const $isMultipleSchoolsOnPoint = createStore<boolean>(false);
export const $schoolDailyStats = createStore<DailyStats[] | null>(null);
