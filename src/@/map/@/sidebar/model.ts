import { createEvent, createStore } from 'effector';

import { CountryData } from '@/map/types';

export const changeSearchText = createEvent<string>();
export const clearSearchText = createEvent();

export const $searchText = createStore('');
export const $searchResults = createStore<CountryData[] | null>([]);
export const $showSearchResults = createStore(false);
export const $noSearchResults = createStore(false);
export const $isSidebarHidden = createStore(false);
export const toggleSidebarVisibility = createEvent();
