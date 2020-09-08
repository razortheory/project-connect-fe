import { useStore } from 'effector-react';
import React from 'react';

import { $noSearchResults } from './search';

export const NotFound = () => <div>Not found</div>;

export const SearchResults = () => (
  <>
    {useStore($noSearchResults) ? (
      <NotFound />
    ) : (
      <ul className="list">
        <li className="list__item list__item--not-verified">Georgia</li>
        <li className="list__item list__item--not-verified">Germany</li>
      </ul>
    )}
  </>
);
