import React, { createElement } from 'react';
import { useStore } from 'effector-react';
import { VoidFn } from '~/core/types';
import { $timer, $timerWorking, toggle } from './model';

export interface CounterProps {
  onToggle: VoidFn;
  isWorking: boolean;
  currentTime: number;
}

export const View = ({
  onToggle,
  isWorking,
  currentTime,
}: Readonly<CounterProps>): JSX.Element => (
  <div>
    <button type="button" onClick={(): void => onToggle()}>
      {isWorking ? 'Stop' : 'Launch'} timer
    </button>

    <span style={{ display: 'block' }}>Current time: {currentTime}</span>
  </div>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Counter = () => {
  const currentTime = useStore($timer);
  const isWorking = useStore($timerWorking);

  return createElement(View, {
    currentTime,
    isWorking,
    onToggle: toggle,
  });
};
