import React, { ChangeEvent } from 'react';

import { SortKey } from '@/sidebar/types';

export const ControlsSort = ({
  sortKey,
  onChangeSortKey,
}: {
  sortKey: SortKey;
  onChangeSortKey: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="radio-group">
    <label className="radio-group__item radio" htmlFor="amountOfDataAvailable">
      <input
        className="radio__input"
        id="amountOfDataAvailable"
        type="radio"
        name="countries-sort"
        value="amountOfDataAvailable"
        checked={sortKey === 'amountOfDataAvailable'}
        onChange={onChangeSortKey}
      />
      <span className="radio__label">Amount of data available</span>
      <div className="radio__marker" />
    </label>
    <label className="radio-group__item radio" htmlFor="dateOfJoining">
      <input
        className="radio__input"
        id="dateOfJoining"
        type="radio"
        name="countries-sort"
        value="dateOfJoining"
        checked={sortKey === 'dateOfJoining'}
        onChange={onChangeSortKey}
      />
      <span className="radio__label">Date of joining</span>
      <div className="radio__marker" />
    </label>
    <label className="radio-group__item radio" htmlFor="countryProgress">
      <input
        className="radio__input"
        id="countryProgress"
        type="radio"
        name="countries-sort"
        value="countryProgress"
        checked={sortKey === 'countryProgress'}
        onChange={onChangeSortKey}
      />
      <span className="radio__label">Country progress</span>
      <div className="radio__marker" />
    </label>
    <label
      className="radio-group__item radio"
      htmlFor="percentSchoolWithConnectivity"
    >
      <input
        className="radio__input"
        id="percentSchoolWithConnectivity"
        type="radio"
        name="countries-sort"
        value="percentSchoolWithConnectivity"
        checked={sortKey === 'percentSchoolWithConnectivity'}
        onChange={onChangeSortKey}
      />
      <span className="radio__label">% Schools with connectivity</span>
      <div className="radio__marker" />
    </label>
  </div>
);
