import { combine, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import React from 'react';

import IconLocation from '~/assets/images/icon-location.svg';
import { setPayload } from '~/lib/effector-kit';
import { ProgressBar } from '~/ui';

import { $school, $schoolDailyStats, $schoolPending } from '@/country/model';
import { $stylePaintData, changeMap } from '@/map/model';
import { getSchoolInfo } from '@/popup/lib';
import { $popup } from '@/popup/model';
import { $controlsMapType } from '@/sidebar/model';
import { getWeekGraphData } from '@/week-graph/lib/get-week-graph-data';
import { WeekGraph } from '@/week-graph/ui';

const onChangeRef = createEvent<HTMLDivElement | null>();

$popup.on(onChangeRef, (popup, element) => {
  if (element) popup?.setDOMContent(element);
});

// SetDOMContent after change map style
const $element = createStore<HTMLDivElement | null>(null);
$element.on(onChangeRef, setPayload);
combine([$popup, $element]).on(changeMap, ([popup, element]) => {
  if (element) popup?.setDOMContent(element);
});

const $weekGraphData = $schoolDailyStats.map(getWeekGraphData);

export const Popup = () => {
  const school = useStore($school);
  const pending = useStore($schoolPending);
  const weekGraphData = useStore($weekGraphData);
  const mapType = useStore($controlsMapType);
  const paintData = useStore($stylePaintData);

  if (!school || pending) {
    return (
      <div ref={onChangeRef} className="school-popup">
        <ProgressBar pending={pending} />
        <div className="school-popup__content">
          {pending ? 'Loading...' : 'N/A'}
        </div>
      </div>
    );
  }

  const {
    id,
    name,
    address,
    postalCode,
    connectionSpeed,
    connectivityType,
    latitude,
    longitude,
    networkCoverage,
    regionClassification,
    connectivityStatus,
    coverageStatus,
    coverageType,
    isVerified,
  } = getSchoolInfo(school);

  const status =
    mapType === 'connectivity' ? connectivityStatus : coverageStatus;

  const headerStatus = isVerified ? status ?? 'unknown' : 'notVerified';

  return (
    <div
      ref={onChangeRef}
      className="school-popup"
      style={{
        borderTop: `0.9rem solid ${paintData.schoolConnectivity[headerStatus]}`,
      }}
      data-id={id}
    >
      <div className="school-popup__content">
        <h2 className="school-popup__title">{name}</h2>
        <p className="school-popup__description">{address}</p>
        <h3 className="school-popup__subtitle school-popup__subtitle--connectivity">
          Connectivity info
        </h3>
        <ul className="school-popup__list definition-list">
          {connectionSpeed && (
            <li className="definition-list__item">
              Average connection speed <strong>{connectionSpeed}</strong>
            </li>
          )}

          {networkCoverage && (
            <li className="definition-list__item">
              Network coverage <strong>{coverageType}</strong>
            </li>
          )}

          {connectivityType && (
            <li className="definition-list__item">
              Connectivity type <strong>{connectivityType}</strong>
            </li>
          )}
        </ul>
        <hr className="school-popup__divider" />
        <div className="school-popup__location-wrapper">
          <h3 className="school-popup__subtitle school-popup__subtitle--location">
            <IconLocation />
            Location info
          </h3>
          <div className="school-popup__tooltip">
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
          </div>
        </div>
        {weekGraphData && (
          <>
            <hr className="school-popup__divider" />
            <div className="school-popup__week-graph">
              <WeekGraph
                weekGraphData={weekGraphData}
                dataType="school"
                showHistory
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
