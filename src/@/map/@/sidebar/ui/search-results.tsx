import { useStore } from 'effector-react';
import React from 'react';

import { $countryList, $noSearchResults } from '@/map/@/sidebar/model';
import { ListItem } from '@/map/@/sidebar/ui/country-list';
import { CountryData } from '@/map/types';

export const SearchResults = () => {
  const countiesList = useStore($countryList);
  return (
    <div className="sidebar__content sidebar__search-results">
      {useStore($noSearchResults) ? (
        // TODO https://app.zeplin.io/project/5f1b2ee7003ed9476de7d4cb/screen/5f3bddc6e011222f381a950f
        <span style={{ padding: 30 }}>Not found</span>
      ) : (
        <ul className="list">
          {countiesList?.map((country: CountryData) => (
            <ListItem country={country} key={country.id} />
          ))}
        </ul>
      )}
    </div>
  );
};
