import { createEvent, createStore } from 'effector';
import { MouseEvent } from 'react';

import { SortValues } from '@/map/@/sidebar/types';
import { CountryData } from '@/map/types';

import { defaultSortValue } from './constants';

export const onClickSidebar = createEvent<MouseEvent<HTMLDivElement>>();
export const toggleSidebarVisibility = createEvent();
export const changeSearchText = createEvent<string>();
export const clearSearchText = createEvent();
export const changeSortValue = createEvent<SortValues>();

export const $isSidebarHidden = createStore(false);
export const $countryList = createStore<CountryData[] | null>(null);
export const $searchText = createStore('');
export const $searchActive = createStore(false);
export const $noSearchResults = createStore(false);
export const $sortValue = createStore<SortValues>(defaultSortValue);
