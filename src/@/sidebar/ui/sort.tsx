import { useStore } from 'effector-react';
import React from 'react';

import { Dropdown } from '~/ui';

import { dropdownCountriesSortData } from '@/sidebar/constants';
import { $sortKey, changeSortKey } from '@/sidebar/model';
import { SortKey } from '@/sidebar/types';

export const Sort = ({ whiteLineClass }: { whiteLineClass?: string }) => (
  <Dropdown<SortKey>
    wrapperClassName="select-wrapper"
    selectClassName={
      whiteLineClass ? ['select', whiteLineClass].join(' ') : 'select'
    }
    items={dropdownCountriesSortData}
    value={useStore($sortKey)}
    onChange={changeSortKey}
  />
);
