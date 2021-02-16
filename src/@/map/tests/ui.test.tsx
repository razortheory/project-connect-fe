/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/ban-ts-comment, @typescript-eslint/ban-ts-comment
*/

import '../../../__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { changeStyle, zoomIn, zoomOut } from '@/map/model';
import { StyleControl, ZoomControl } from '@/map/ui/footer';
import { Map } from '@/map/ui/map';

let container = (null as unknown) as Element;

describe('map tests', () => {
  window.URL.createObjectURL = jest.fn();
  let Model: any;
  let Init: any;
  let InitMapFx: any;

  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.append(container);

    Model = require('@/map/model');
    Init = require('@/map/init');
    InitMapFx = require('@/map/effects/init-map-fx');
    Model;
    Init;
    InitMapFx;
  });

  afterEach(() => {
    // @ts-expect-error
    window.URL.createObjectURL.mockReset();

    unmountComponentAtNode(container);
    container.remove();
    container = (null as unknown) as Element;
  });

  it('map component should be rendered', () => {
    act(() => {
      render(<Map />, container);
    });
    expect(document.querySelector('#map')).not.toBeNull();
  });

  it('changeStyle event should be called after style buttons were clicked', () => {
    act(() => {
      render(<StyleControl />, container);
    });

    const allStyleButtons = document.querySelectorAll('.map-switcher__button');
    let darkStyleButton: Element | null = null;
    let lightStyleButton: Element | null = null;
    let satelliteStyleButton: Element | null = null;
    let accessibleStyleButton: Element | null = null;
    allStyleButtons.forEach((element) => {
      if (element.textContent === 'dark') {
        darkStyleButton = element;
      }
      if (element.textContent === 'light') {
        lightStyleButton = element;
      }
      if (element.textContent === 'satellite') {
        satelliteStyleButton = element;
      }
      if (element.textContent === 'accessible') {
        accessibleStyleButton = element;
      }
    });
    // @ts-expect-error
    expect(darkStyleButton.textContent).toEqual('dark');
    // @ts-expect-error
    expect(lightStyleButton.textContent).toEqual('light');
    // @ts-expect-error
    expect(satelliteStyleButton.textContent).toEqual('satellite');
    // @ts-expect-error
    expect(accessibleStyleButton.textContent).toEqual('accessible');

    const spy = jest.fn();
    changeStyle.watch(spy);

    act(() => {
      // @ts-expect-error
      lightStyleButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      // @ts-expect-error
      satelliteStyleButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      // @ts-expect-error
      accessibleStyleButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      // @ts-expect-error
      darkStyleButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('zoom in and zoom out events should be called after click on corresponding buttons', () => {
    act(() => {
      render(<ZoomControl />, container);
    });

    const zoomButtons = document.querySelectorAll('.map-resizer__button');

    const zoomOutButton = zoomButtons[0];
    const zoomInButton = zoomButtons[1];

    const spyOut = jest.fn();
    const spyIn = jest.fn();
    zoomOut.watch(spyOut);
    zoomIn.watch(spyIn);
    act(() => {
      zoomOutButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      zoomInButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyOut).toHaveBeenCalled();
    expect(spyIn).toHaveBeenCalled();
  });
});
