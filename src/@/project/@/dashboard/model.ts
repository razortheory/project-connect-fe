import { createEvent, createStore } from 'effector';
import { ChangeEvent } from 'react';

import { CountryMetaData } from '~/api/types';

import { SortValues } from '@/map/@/sidebar/types';
import { defaultSortValue } from '@/project/@/dashboard/constats';

export const getTargetValue = (event: ChangeEvent<HTMLInputElement>): string =>
  event.target.value;

export const changeSearchText = createEvent<string>();
export const changeViewType = createEvent();
export const clearSearchText = createEvent();
export const changeSortValue = createEvent<SortValues>();

export const $searchText = createStore('');
export const $hasSearchText = createStore(false);
export const $countries = createStore<CountryMetaData[]>([]);
export const $notFound = createStore(false);
export const $isListType = createStore(false);
export const $isLoading = createStore<boolean>(false);
export const $sortValue = createStore<SortValues>(defaultSortValue);
