import { createEvent, createStore } from 'effector';

import { CountryBasic } from '~/api/types';

import { SortKey } from '@/map/@/sidebar/types';
import { defaultSortKey } from '@/project/@/dashboard/constats';

export const changeSearchText = createEvent<string>();
export const changeViewType = createEvent();
export const clearSearchText = createEvent();
export const changeSortKey = createEvent<SortKey>();
export const changeControlsSortKey = createEvent<SortKey>();
export const submitControlsChanges = createEvent();

export const $searchText = createStore('');
export const $hasSearchText = createStore(false);
export const $countriesList = createStore<CountryBasic[]>([]);
export const $noSearchResults = createStore(false);
export const $isListType = createStore(false);
export const $isLoading = createStore<boolean>(false);
export const $sortKey = createStore<SortKey>(defaultSortKey);
export const $controlsSortKey = createStore<SortKey>(defaultSortKey);
export const $isControlsChanged = createStore(false);
