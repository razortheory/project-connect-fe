import { argumentHistory } from '~/core/test-utils';

import './init';
import { $timer, $timerWorking, tickFx, toggle } from './model';

describe('counter', () => {
  const tick = jest.fn().mockImplementation(() => Promise.resolve());
  tickFx.use(tick);

  it('tick increases timer', () => {
    const timerFn = jest.fn();
    $timer.watch(timerFn);
    tickFx();
    expect(argumentHistory(timerFn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
      ]
    `);
  });

  it('toggle changes timer status', () => {
    const statusFn = jest.fn();
    $timerWorking.watch(statusFn);
    toggle();
    toggle();
    expect(argumentHistory(statusFn)).toMatchInlineSnapshot(`
      Array [
        false,
        true,
        false,
      ]
    `);
  });

  it('toggle increases timer', () => {
    const timerFn = jest.fn();
    $timer.watch(timerFn);
    toggle();
    toggle();
    expect(argumentHistory(timerFn)).toMatchInlineSnapshot(`
      Array [
        2,
        3,
      ]
    `);
  });
});
