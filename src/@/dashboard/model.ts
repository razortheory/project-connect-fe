import { createEvent, createStore } from 'effector';

import { CountryBasic } from '~/api/types';

import { defaultSortKey } from '@/dashboard/constats';
import { SortKey } from '@/sidebar/types';

import { Tabs } from './types';

export const changeSearchText = createEvent<string>();
export const changeViewType = createEvent();
export const changePopupStatus = createEvent();
export const clearSearchText = createEvent();
export const changeSortKey = createEvent<SortKey>();
export const changeDashboardCountryId = createEvent<number>();
export const changeControlsSortKey = createEvent<SortKey>();
export const submitControlsChanges = createEvent();

export const $searchText = createStore('');
export const $hasSearchText = createStore(false);
export const $countriesList = createStore<CountryBasic[]>([]);
export const $dashboardCountryId = createStore(0);
export const $noSearchResults = createStore(false);
export const $isListType = createStore(false);
export const $isPopupOpen = createStore(false);
export const $isLoading = createStore<boolean>(false);
export const $sortKey = createStore<SortKey>(defaultSortKey);
export const $controlsSortKey = createStore<SortKey>(defaultSortKey);
export const $isControlsChanged = createStore(false);

export const selectCountriesTab = createEvent();
export const selectSortTab = createEvent();
export const $tab = createStore<Tabs>('countries');
export const $isCountriesTab = createStore(true);
export const $isSortTab = createStore(false);
