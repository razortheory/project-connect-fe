/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/ban-ts-comment
*/

import '../../../__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

let container = (null as unknown) as Element;

describe('current', () => {
  window.URL.createObjectURL = jest.fn();
  let Model: any;
  let INIT: any;
  let InitMapFx: any;
  let Map: any;

  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.append(container);

    Model = require('@/map/model');
    INIT = require('@/map/init');
    InitMapFx = require('@/map/effects/init-map-fx');
    Map = require('@/map/ui/map');
    Model;
    INIT;
    InitMapFx;
    Map;
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.URL.createObjectURL.mockReset();

    unmountComponentAtNode(container);
    container.remove();
    container = (null as unknown) as Element;
  });

  it('current', () => {
    act(() => {
      render(<Map.Map />, container);
    });

    const spy = jest.fn();
    InitMapFx.initMapFx.watch(spy);
    InitMapFx.initMapFx();
    expect(spy).toHaveBeenCalledTimes(1);

    // Act(() => {
    //   Model.$map.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    // });
  });
});
