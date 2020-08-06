import React, { createElement } from 'react';
import { useStore } from 'effector-react';
import { VoidFn } from '~/core/types';
import { $timer, $timerWorking, toggle } from './model';

export interface CounterProps {
  onToggle: VoidFn;
  isWorking: boolean;
  currentTime: number;
}

export const View = ({ onToggle, isWorking, currentTime }: CounterProps) => (
  <div>
    <button type="button" onClick={(): void => onToggle()}>
      {isWorking ? 'Stop' : 'Launch'} timer
    </button>
    <div>Current time: {currentTime}</div>
  </div>
);

export const Counter = (): JSX.Element => {
  const currentTime = useStore($timer);
  const isWorking = useStore($timerWorking);

  return createElement(View, {
    currentTime,
    isWorking,
    onToggle: toggle,
  });
};
