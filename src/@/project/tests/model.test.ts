// eslint-disable-next-line jest/no-mocks-import,no-restricted-imports
import '../../../../__mocks__/match-media';

import * as init from '@/project/init';
import {
  $fullNameError,
  $organizationError,
  $purposeError,
  $yourMessageError,
  onJoinUsFormSubmit,
} from '@/project/model';

describe('Join Us Form tests', () => {
  it('error values should be changed when onJoinUsFormSubmit called', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    init;
    expect($fullNameError.getState()).toEqual(false);
    expect($organizationError.getState()).toEqual(false);
    expect($purposeError.getState()).toEqual(false);
    expect($yourMessageError.getState()).toEqual(false);

    onJoinUsFormSubmit();

    expect($fullNameError.getState()).toEqual(true);
    expect($organizationError.getState()).toEqual(true);
    expect($purposeError.getState()).toEqual(true);
    expect($yourMessageError.getState()).toEqual(true);
  });
});
