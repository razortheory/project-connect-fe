import React, { createElement } from 'react';
import { useStore } from 'effector-react';
import { VoidFn } from '~/core/types';
import { $timer, $timerWorking, toggle } from './model';

export interface Props {
  onToggle: VoidFn;
  isWorking: boolean;
  currentTime: number;
}

export const View = ({ onToggle, isWorking, currentTime }: Props) => (
  <div>
    <button type="button" onClick={(): void => onToggle()}>
      {isWorking ? 'Stop' : 'Launch'} timer
    </button>
    <p>Timer: {currentTime}</p>
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
