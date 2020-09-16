import { createEvent, createStore } from 'effector';
import { ChangeEvent } from 'react';

import { fetchCountriesDataFx } from '~/features/map/country';
import { CountryData } from '~/features/map/types';

export const getTargetValue = (event: ChangeEvent<HTMLInputElement>): string =>
  event.target.value;

export const changeSearchText = createEvent<string>();
export const changeViewType = createEvent();
export const clearSearchText = createEvent();

export const $searchText = createStore('');
export const $searchResults = createStore<CountryData[] | null>([]);
export const $noSearchResults = createStore(false);
export const $isListType = createStore(false);
export const $isLoading = fetchCountriesDataFx.pending;
