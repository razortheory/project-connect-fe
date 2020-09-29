import { useStore } from 'effector-react';
import React from 'react';

import { inputValue } from '~/lib/event-reducers';

import {
  $controlsMapStyle,
  $controlsMapType,
  $controlsSortKey,
  $isControlsChanged,
  changeControlsMapStyle,
  changeControlsMapType,
  changeControlsSortKey,
  submitControlsChanges,
} from '@/map/@/sidebar/model';
import { SortKey } from '@/map/@/sidebar/types';
import { MapType, Style } from '@/map/types';

const onChangeMapType = changeControlsMapType.prepend(inputValue<MapType>());
const onChangeMapStyle = changeControlsMapStyle.prepend(inputValue<Style>());
const onChangeSortKey = changeControlsSortKey.prepend(inputValue<SortKey>());

export const Controls = () => {
  const mapType = useStore($controlsMapType);
  const mapStyle = useStore($controlsMapStyle);
  const sortKey = useStore($controlsSortKey);

  return (
    <form className="sidebar__form form" action="/">
      <h3 className="sidebar__secondary-title">Map</h3>
      <div className="radio-group">
        <label className="radio-group__item radio" htmlFor="connectivity-map">
          <input
            className="radio__input"
            id="connectivity-map"
            type="radio"
            name="map-type"
            value="connectivity"
            checked={mapType === 'connectivity'}
            onChange={onChangeMapType}
          />
          <span className="radio__label">Connectivity map</span>
          <div className="radio__marker" />
        </label>
        <label className="radio-group__item radio" htmlFor="coverage-map">
          <input
            className="radio__input"
            id="coverage-map"
            type="radio"
            name="map-type"
            value="coverage"
            checked={mapType === 'coverage'}
            onChange={onChangeMapType}
          />
          <span className="radio__label">Coverage map</span>
          <div className="radio__marker" />
        </label>
      </div>
      <hr className="sidebar__divider" />
      <h3 className="sidebar__secondary-title">Map styles</h3>
      <div className="radio-group">
        <label className="radio-group__item radio" htmlFor="map-style-dark">
          <input
            className="radio__input"
            id="map-style-dark"
            type="radio"
            name="map-style"
            value="dark"
            checked={mapStyle === 'dark'}
            onChange={onChangeMapStyle}
          />
          <span className="radio__label">Dark</span>
          <div className="radio__marker" />
        </label>
        <label className="radio-group__item radio" htmlFor="map-style-light">
          <input
            className="radio__input"
            id="map-style-light"
            type="radio"
            name="map-style"
            value="light"
            checked={mapStyle === 'light'}
            onChange={onChangeMapStyle}
          />
          <span className="radio__label">Light</span>
          <div className="radio__marker" />
        </label>
        <label
          className="radio-group__item radio"
          htmlFor="map-style-satellite"
        >
          <input
            className="radio__input"
            id="map-style-satellite"
            type="radio"
            name="map-style"
            value="satellite"
            checked={mapStyle === 'satellite'}
            onChange={onChangeMapStyle}
          />
          <span className="radio__label">Satellite</span>
          <div className="radio__marker" />
        </label>
        <label
          className="radio-group__item radio"
          htmlFor="map-style-accessible"
        >
          <input
            className="radio__input"
            id="map-style-accessible"
            type="radio"
            name="map-style"
            value="accessible"
            checked={mapStyle === 'accessible'}
            onChange={onChangeMapStyle}
          />
          <span className="radio__label">Accessible</span>
          <div className="radio__marker" />
        </label>
      </div>
      <hr className="sidebar__divider" />
      <h3 className="sidebar__secondary-title">Sort countries by</h3>
      <div className="radio-group">
        <label
          className="radio-group__item radio"
          htmlFor="amountOfDataAvailable"
        >
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

      <button
        type="button"
        disabled={!useStore($isControlsChanged)}
        className="button button--primary button--full-width button--pull-bottom"
        onClick={() => submitControlsChanges()}
      >
        Apply
      </button>
    </form>
  );
};
