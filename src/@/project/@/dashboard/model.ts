import { createEvent, createStore } from 'effector';
import { ChangeEvent } from 'react';

import { CountryMetaData } from '~/api/types';

export const getTargetValue = (event: ChangeEvent<HTMLInputElement>): string =>
  event.target.value;

export const changeSearchText = createEvent<string>();
export const changeViewType = createEvent();
export const clearSearchText = createEvent();

export const $searchText = createStore('');
export const $hasSearchText = createStore(false);
export const $countries = createStore<CountryMetaData[]>([]);
export const $notFound = createStore(false);
export const $isListType = createStore(false);
export const $isLoading = createStore<boolean>(false);
