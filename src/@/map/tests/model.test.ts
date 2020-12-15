/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
*/

import '~/../src/__mocks__/match-media';

describe('Join Us Form tests', () => {
  window.URL.createObjectURL = jest.fn();
  let Model: any;
  let INIT: any;
  let InitMapFx: any;
  let mapboxgl: any;
  beforeEach(() => {
    jest.resetModules();
    Model = require('@/map/model');
    INIT = require('@/map/init');
    InitMapFx = require('@/map/effects/init-map-fx');
    mapboxgl = require('mapbox-gl');
    Model;
    INIT;
    InitMapFx;
    mapboxgl;
  });
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.URL.createObjectURL.mockReset();
  });

  it('styles should be changed when changeStyle is called with according argument', () => {
    expect(Model.$style.getState()).toEqual('dark');
    Model.changeStyle('light');
    expect(Model.$style.getState()).toEqual('light');
    Model.changeStyle('satellite');
    expect(Model.$style.getState()).toEqual('satellite');
    Model.changeStyle('accessible');
    expect(Model.$style.getState()).toEqual('accessible');
    Model.changeStyle('dark');
    expect(Model.$style.getState()).toEqual('dark');
  });

  it('trash', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const container = document.createElement('div');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const spy = jest.fn();
    InitMapFx.initMapFx.watch(spy);
    InitMapFx.initMapFx();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
