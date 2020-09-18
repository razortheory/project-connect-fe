import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import React from 'react';

import { setPayload } from '~/lib/effector-kit';

import { $popup, $popupContext } from '@/map/@/country/model';

export const onChangeRef = createEvent<HTMLDivElement | null>();

$popup.on(onChangeRef, setPayload); // Save popup element

export const Popup = () => {
  const { description } = useStore($popupContext);

  return (
    <div ref={onChangeRef}>
      <h2 className="country-popup__title">{description}</h2>
      <p className="country-popup__description">Matehuala, San Luis Potosí</p>
      <h3 className="country-popup__subtitle">Connectivity info</h3>
      <ul className="country-popup__list definition-list">
        <li className="definition-list__item">
          Average connection speed <strong>2.2 mb/s</strong>
        </li>
        <li className="definition-list__item">
          Network coverage <strong>3G</strong>
        </li>
        <li className="definition-list__item">
          Connectivity type <strong>Fiber cable</strong>
        </li>
      </ul>
      <hr className="country-popup__divider" />
      <h3 className="country-popup__subtitle">Location info</h3>
      <ul className="country-popup__list definition-list">
        <li className="definition-list__item">
          Region classification <strong>Suburban</strong>
        </li>
        <li className="definition-list__item">
          Postal code <strong>8940000</strong>
        </li>
        <li className="definition-list__item">
          Latitude <strong>-11.2</strong>
        </li>
        <li className="definition-list__item">
          Longitude <strong>-47.9</strong>
        </li>
      </ul>
      <hr className="country-popup__divider" />
      Place for Daily graph (can&apos;t be mounted directly to popup)
    </div>
  );
};
