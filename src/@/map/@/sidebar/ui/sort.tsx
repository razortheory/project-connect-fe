import { useStore } from 'effector-react';
import React from 'react';

import { selectValue } from '~/lib/event-reducers/select-value';

import { $sortValue, changeSortValue } from '@/map/@/sidebar/model';
import { SortValue } from '@/map/@/sidebar/types';

const onChange = changeSortValue.prepend(selectValue<SortValue>());

export const Sort = () => (
  <label htmlFor="sorting-select" className="select-wrapper">
    <span className="visually-hidden">Sort search result</span>
    <select
      id="sorting-select"
      className="select"
      onChange={onChange}
      value={useStore($sortValue)}
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
