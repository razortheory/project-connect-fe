import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import React from 'react';

import {
  $popup,
  $school,
  $schoolDailyStats,
  $schoolPending,
} from '@/map/@/country/model';
import { getWeekGraphData, WeekGraph } from '@/map/@/sidebar/ui';

import { getPopupClassName } from './get-popup-class-name';
import { getSchoolInfo } from './get-school-info';
import { ProgressLine } from './progress-bar';

export const onChangeRef = createEvent<HTMLDivElement | null>();

$popup.on(onChangeRef, (popup, element) => {
  if (element) popup?.setDOMContent(element);
});

const $weekGraphData = $schoolDailyStats.map(getWeekGraphData);

export const Popup = () => {
  const school = useStore($school);
  const isLoading = useStore($schoolPending);
  const weekGraphData = useStore($weekGraphData);

  if (!school || isLoading) {
    return (
      <div ref={onChangeRef} className="school-popup">
        <ProgressLine visible={isLoading} />
        <div className="school-popup__content">
          {isLoading ? 'Loading...' : 'N/A'}
        </div>
      </div>
    );
  }

  const {
    id,
    name,
    address,
    postalCode,
    connectivityStatus,
    connectionSpeed,
    connectivityType,
    latitude,
    longitude,
    coverage,
    regionClassification,
  } = getSchoolInfo(school);

  return (
    <div
      ref={onChangeRef}
      className={`school-popup ${getPopupClassName(connectivityStatus)}`}
      data-id={id}
    >
      <div className="school-popup__content">
        <h2 className="school-popup__title">{name}</h2>
        <p className="school-popup__description">{address}</p>
        <h3 className="school-popup__subtitle">Connectivity info</h3>
        <ul className="school-popup__list definition-list">
          {connectionSpeed && (
            <li className="definition-list__item">
              Average connection speed <strong>{connectionSpeed}</strong>
            </li>
          )}

          {coverage && (
            <li className="definition-list__item">
              Network coverage <strong>{coverage}</strong>
            </li>
          )}

          {connectivityType && (
            <li className="definition-list__item">
              Connectivity type <strong>{connectivityType}</strong>
            </li>
          )}
        </ul>
        <hr className="school-popup__divider" />
        <h3 className="school-popup__subtitle">Location info</h3>
        <ul className="school-popup__list definition-list">
          {regionClassification && (
            <li className="definition-list__item">
              Region classification <strong>{regionClassification}</strong>
            </li>
          )}

          {postalCode && (
            <li className="definition-list__item">
              Postal code <strong>{postalCode}</strong>
            </li>
          )}

          {latitude && (
            <li className="definition-list__item">
              Latitude <strong>{latitude}</strong>
            </li>
          )}

          {longitude && (
            <li className="definition-list__item">
              Longitude <strong>{longitude}</strong>
            </li>
          )}
        </ul>
        {weekGraphData && (
          <>
            <hr className="school-popup__divider" />
            <WeekGraph weekGraphData={weekGraphData} />
          </>
        )}
      </div>
    </div>
  );
};
