import { createEffect, createEvent, createStore } from 'effector';
import { KeyboardEvent, MouseEvent } from 'react';

import { CountryMetaData } from '~/api/types';
import { getWeekInterval } from '~/lib/date-fns-kit';

import { SortValues } from '@/map/@/sidebar/types';
import { defaultMapType, defaultStyle } from '@/map/constants';
import { MapTypes, Style } from '@/map/types';

import { defaultSortValue } from './constants';

export const onClickSidebar = createEvent<MouseEvent<HTMLDivElement>>();
export const toggleSidebarVisibility = createEvent();
export const changeSearchText = createEvent<string>();
export const clearSearchText = createEvent();
export const onSearchPressKey = createEvent<KeyboardEvent<HTMLInputElement>>();
export const onSearchPressEnter = createEvent<
  KeyboardEvent<HTMLInputElement>
>();
export const changeSortValue = createEvent<SortValues>();

export const blurInputFx = createEffect<
  KeyboardEvent<HTMLInputElement>,
  void
>();
export const navigateToMapCountryFx = createEffect<string | null, void>();

export const $isSidebarHidden = createStore(false);
export const $countryList = createStore<CountryMetaData[] | null>(null);
export const $searchText = createStore('');
export const $searchActive = createStore(false);
export const $noSearchResults = createStore(false);
export const $noSearchCountryFound = createStore(false);
export const $sortValue = createStore<SortValues>(defaultSortValue);

export const $week = createStore(getWeekInterval(new Date()));
export const $isThisWeek = createStore(true);
export const nextWeek = createEvent();
export const previousWeek = createEvent();

export const $controlsMapType = createStore<MapTypes>(defaultMapType);
export const $controlsMapStyle = createStore<Style>(defaultStyle);
export const $controlsSortValue = createStore<SortValues>(defaultSortValue);
export const $controlsExistsChanges = createStore<boolean>(false);
export const changeControlsMapType = createEvent<MapTypes>();
export const changeControlsMapStyle = createEvent<Style>();
export const changeControlsSortValue = createEvent<SortValues>();
export const submitControlsChanges = createEvent();
