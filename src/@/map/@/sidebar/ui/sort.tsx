import { useStore } from 'effector-react';
import React from 'react';

import { selectValue } from '~/lib/event-reducers/select-value';

import { $sortKey, changeSortKey } from '@/map/@/sidebar/model';
import { SortKey } from '@/map/@/sidebar/types';

const onChange = changeSortKey.prepend(selectValue<SortKey>());

export const Sort = () => (
  <label htmlFor="sorting-select" className="select-wrapper">
    <span className="visually-hidden">Sort search result</span>
    <select
      id="sorting-select"
      className="select"
      onChange={onChange}
      value={useStore($sortKey)}
    >
      <option className="select__option" value="amountOfDataAvailable">
        Amount of data available
      </option>
      <option className="select__option" value="dateOfJoining">
        Date of joining
      </option>
      <option className="select__option" value="countryProgress">
        Country progress
      </option>
      <option className="select__option" value="percentSchoolWithConnectivity">
        % Schools with connectivity
      </option>
    </select>
  </label>
);
