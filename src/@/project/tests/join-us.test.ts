import { createEvent, sample } from 'effector';

import { $yourMessage, $yourMessageError } from '@/project/model';


describe('some', () => {
  it('first', () => {
    const submit = createEvent();

    sample({
      source: $yourMessage,
      clock: submit,
      fn: (state:string) => state.trim().length === 0,
      target: $yourMessageError,
    });
    submit();

    expect($yourMessageError.getState()).toEqual(true);
  });
});
