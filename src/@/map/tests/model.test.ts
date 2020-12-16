/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/ban-ts-comment
*/

import '~/../src/__mocks__/match-media';

import { styleUrls } from '@/map/constants';

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
    // @ts-expect-error
    window.URL.createObjectURL.mockReset();
  });

  it('styles and their urls should be changed when changeStyle is called with according argument', () => {
    expect(Model.$style.getState()).toEqual('dark');
    // @ts-expect-error
    expect(styleUrls[Model.$style.getState()]).toEqual(
      'mapbox://styles/ivanrt/ckdk80nes0wb01iqminlchno4'
    );
    Model.changeStyle('light');
    expect(Model.$style.getState()).toEqual('light');
    // @ts-expect-error
    expect(styleUrls[Model.$style.getState()]).toEqual(
      'mapbox://styles/ivanrt/ckdzse0bp0r2419lbj96dw07a'
    );
    Model.changeStyle('satellite');
    expect(Model.$style.getState()).toEqual('satellite');
    // @ts-expect-error
    expect(styleUrls[Model.$style.getState()]).toEqual(
      'mapbox://styles/ivanrt/cke2hmks20xc119mpssxyiytb'
    );
    Model.changeStyle('accessible');
    expect(Model.$style.getState()).toEqual('accessible');
    // @ts-expect-error
    expect(styleUrls[Model.$style.getState()]).toEqual(
      'mapbox://styles/ivanrt/cke16a91g0lg41aoz5zk4ddr2'
    );
    Model.changeStyle('dark');
    expect(Model.$style.getState()).toEqual('dark');
    // @ts-expect-error
    expect(styleUrls[Model.$style.getState()]).toEqual(
      'mapbox://styles/ivanrt/ckdk80nes0wb01iqminlchno4'
    );
  });
});
