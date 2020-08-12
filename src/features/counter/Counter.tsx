import React from 'react';
import { useStore } from 'effector-react';
import { getInverted } from '~/lib/effector-kit';
import { $timer, $timerWorking, toggle } from './model';

const onToggle = toggle.prepend(getInverted);

export const Counter = (): JSX.Element => {
  const currentTime = useStore($timer);
  const isWorking = useStore($timerWorking);

  return (
    <div>
      <button type="button" onClick={onToggle}>
        {isWorking ? 'Stop' : 'Launch'} timer
      </button>
      <p>Timer: {currentTime}</p>
    </div>
  );
};
