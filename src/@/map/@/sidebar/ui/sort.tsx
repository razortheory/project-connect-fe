import { useStore } from 'effector-react';
import React from 'react';

import { getSelectSortValues } from '@/map/@/sidebar/helpers';
import { $sortValue, changeSortValue } from '@/map/@/sidebar/model';

const onChange = changeSortValue.prepend(getSelectSortValues);

export const Sort = () => (
  <div>
    <select onChange={onChange} value={useStore($sortValue)}>
      <option value="amountOfDataAvailable">Amount of data available</option>
      <option value="dateOfJoining">Date of joining</option>
      <option value="countryProgress">Country progress</option>
      <option value="percentSchoolWithConnectivity">
        % Schools with connectivity
      </option>
    </select>
  </div>
);
