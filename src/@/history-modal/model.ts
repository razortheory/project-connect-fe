import { Interval } from 'date-fns';
import { createEvent, createStore } from 'effector';

import { DailyStats } from '~/api/types';
import { IntervalUnit } from '~/lib/date-fns-kit/types';

import { defaultInterval } from '@/sidebar/constants';

import { StatsDataType } from './types';

export const changeHistoryDataType = createEvent<StatsDataType>();
export const closeHistoryModal = createEvent();
export const changeHistoryIntervalUnit = createEvent<IntervalUnit>();
export const nextHistoryInterval = createEvent();
export const previousHistoryInterval = createEvent();

export const $historyDataType = createStore<StatsDataType | null>(null);
export const $isOpenHistoryModal = createStore(false);
export const $historyIntervalUnit = createStore<IntervalUnit>('week');
export const $historyInterval = createStore<Interval>(defaultInterval);
export const $isCurrentHistoryInterval = createStore(true);
export const $isNextHistoryIntervalAvailable = createStore(false);
export const $isPreviousHistoryIntervalAvailable = createStore(false);
export const $historyData = createStore<DailyStats[] | null>(null);
export const $historyDataPending = createStore(false);
export const $historyPlaceName = createStore<string | null>(null);
