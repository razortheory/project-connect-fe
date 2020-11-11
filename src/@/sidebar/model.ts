// TODO: Refactor controls (improve form management)

import { createEffect, createEvent, createStore } from 'effector';
import { KeyboardEvent, MouseEvent } from 'react';

import { fetchCountriesFx } from '~/api/project-connect';
import { CountryBasic } from '~/api/types';

import { defaultMapType, defaultStyle } from '@/map/constants';
import { MapType, Style } from '@/map/types';

import { defaultInterval, defaultSortKey } from './constants';
import { SortKey, Tabs } from './types';

export const onClickSidebar = createEvent<MouseEvent<HTMLDivElement>>();
export const toggleSidebar = createEvent();
export const changeSearchText = createEvent<string>();
export const clearSearchText = createEvent();
export const onSearchPressKey = createEvent<KeyboardEvent<HTMLInputElement>>();
export const onSearchPressEnter = createEvent<
  KeyboardEvent<HTMLInputElement>
>();
export const changeSortKey = createEvent<SortKey>();
export const changeIsSearchFocused = createEvent<boolean>();

export const blurInputFx = createEffect<
  KeyboardEvent<HTMLInputElement>,
  void
>();

export const $isSidebarCollapsed = createStore(false);
export const $countriesList = createStore<CountryBasic[]>([]);
export const $countriesPending = fetchCountriesFx.pending;
export const $searchText = createStore('');
export const $isSearchFocused = createStore(false);
export const $searchActive = createStore(false);
export const $noSearchResults = createStore(false);
export const $noSearchCountryFound = createStore(false);
export const $sortKey = createStore<SortKey>(defaultSortKey);

export const $week = createStore(defaultInterval);
export const $isThisWeek = createStore(true);
export const $isNextWeekAvailable = createStore(false);
export const $isPreviousWeekAvailable = createStore(false);
export const nextWeek = createEvent();
export const previousWeek = createEvent();

export const $controlsMapType = createStore<MapType>(defaultMapType);
export const $controlsMapStyle = createStore<Style>(defaultStyle);
export const $controlsSortKey = createStore<SortKey>(defaultSortKey);
export const $isControlsChanged = createStore<boolean>(false);
export const changeControlsMapType = createEvent<MapType>();
export const changeControlsMapStyle = createEvent<Style>();
export const changeControlsSortKey = createEvent<SortKey>();
export const submitControlsChanges = createEvent();

export const selectMapTab = createEvent();
export const selectInfoTab = createEvent();
export const selectControlsTab = createEvent();
export const $tab = createStore<Tabs>('map');
export const $isMapTab = createStore(true);
export const $isContentTab = createStore(false);
export const $isControlsTab = createStore(false);
