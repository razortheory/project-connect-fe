import { createEvent, createStore } from 'effector';

import { CountryMetaData } from '~/api/types';

import { SortValue } from '@/map/@/sidebar/types';
import { defaultSortValue } from '@/project/@/dashboard/constats';

export const changeSearchText = createEvent<string>();
export const changeViewType = createEvent();
export const clearSearchText = createEvent();
export const changeSortValue = createEvent<SortValue>();

export const $searchText = createStore('');
export const $hasSearchText = createStore(false);
export const $countries = createStore<CountryMetaData[]>([]);
export const $notFound = createStore(false);
export const $isListType = createStore(false);
export const $isLoading = createStore<boolean>(false);
export const $sortValue = createStore<SortValue>(defaultSortValue);
