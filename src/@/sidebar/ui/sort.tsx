import { useStore } from 'effector-react';
import React from 'react';

import { Dropdown } from '~/ui';

import { dropdownCountriesSortData } from '@/sidebar/constants';
import { $sortKey, changeSortKey } from '@/sidebar/model';
import { SortKey } from '@/sidebar/types';

export const Sort = () => (
  <Dropdown<SortKey>
    wrapperClassName="select-wrapper"
    selectClassName="select"
    items={dropdownCountriesSortData}
    value={useStore($sortKey)}
    onChange={changeSortKey}
  />
);
