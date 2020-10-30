import { useStore } from 'effector-react';
import React from 'react';

import { getInverted } from '~/lib/effector-kit';

import {
  $isPopupOpen,
  $noSearchResults,
  changePopupStatus,
} from '@/dashboard/model';

import { CountryList } from './country-list';
import { CountryPopupDetails } from './county-popup';

export const NotFound = () => <h1>Countries not found</h1>;
// View
const onChangeView = changePopupStatus.prepend(getInverted);

const CountriesFound = () => {
  const isPopupOpen = useStore($isPopupOpen);

  return isPopupOpen ? (
    <div className="popup-country__container">
      <button
        type="button"
        onClick={onChangeView}
        className="popup-country__button popup-country__close-button"
      >
        ×
      </button>
      <CountryPopupDetails />
    </div>
  ) : (
    <CountryList />
  );
};

export const SearchResults = () => (
  <>{useStore($noSearchResults) ? <NotFound /> : <CountriesFound />}</>
);
