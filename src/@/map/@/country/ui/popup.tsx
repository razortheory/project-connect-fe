import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import React from 'react';

import { setPayload } from '~/lib/effector-kit';

import { $popup, $schoolDetailsData } from '@/map/@/country/model';

import { DumpSchoolDetails, getSchoolDetails } from './get-school-details';

export const onChangeRef = createEvent<HTMLDivElement | null>();

$popup.on(onChangeRef, setPayload); // Save popup element

export const Popup = () => {
  const dataToDetails = useStore($schoolDetailsData) ?? DumpSchoolDetails;

  const {
    schoolName,
    schoolAddress,
    postalCode,
    popupClassname,
    internetSpeed,
    connectivityType,
    latitude,
    longitude,
    coverage,
    region,
  } = getSchoolDetails(dataToDetails);

  return (
    <div ref={onChangeRef} className={popupClassname}>
      <h2 className="country-popup__title">{schoolName}</h2>
      <p className="country-popup__description">{schoolAddress}</p>
      <h3 className="country-popup__subtitle">Connectivity info</h3>
      <ul className="country-popup__list definition-list">
        {internetSpeed && (
          <li className="definition-list__item">
            Average connection speed <strong>{internetSpeed}</strong>
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
      <hr className="country-popup__divider" />
      <h3 className="country-popup__subtitle">Location info</h3>
      <ul className="country-popup__list definition-list">
        {region && (
          <li className="definition-list__item">
            Region classification <strong>{region}</strong>
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
      <hr className="country-popup__divider" />
      Place for Daily graph
    </div>
  );
};
