import { useStore } from 'effector-react';
import React from 'react';

import { CountryMetaData } from '~/api/types';

import { $countryList, $noSearchResults } from '@/map/@/sidebar/model';
import { ListItem } from '@/map/@/sidebar/ui/country-list';

export const SearchResults = () => {
  const countiesList = useStore($countryList);
  return (
    <div className="sidebar__content sidebar__search-results">
      {useStore($noSearchResults) ? (
        // TODO https://app.zeplin.io/project/5f1b2ee7003ed9476de7d4cb/screen/5f3bddc6e011222f381a950f
        <span style={{ padding: 30 }}>Not found</span>
      ) : (
        <ul className="sidebar__country-list list">
          {countiesList?.map((country: CountryMetaData) => (
            <ListItem country={country} key={country.id} />
          ))}
        </ul>
      )}
    </div>
  );
};
