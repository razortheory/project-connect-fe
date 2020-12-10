// eslint-disable-next-line jest/no-mocks-import,no-restricted-imports
import '../../../../__mocks__/match-media';

import {
  $fullNameError,
  $organizationError,
  $purposeError,
  $yourMessageError,
  onFullNameChange,
  onJoinUsFormSubmit,
  onOrganizationChange,
  onPurposeChange,
  onYourMessageChange,
} from '@/project/model';

describe('Join Us Form tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-var-requires,global-require
  const MyModule=require('@/project/init');;
  beforeEach(() => {
      jest.resetModules();
  });
  it('error values should be changed when onJoinUsFormSubmit called', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    MyModule;
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

  it('error', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    MyModule;
    expect($fullNameError.getState()).toEqual(false);
    expect($organizationError.getState()).toEqual(false);
    expect($purposeError.getState()).toEqual(false);
    expect($yourMessageError.getState()).toEqual(false);
    onJoinUsFormSubmit();
    expect($fullNameError.getState()).toEqual(true);
    expect($organizationError.getState()).toEqual(true);
    expect($purposeError.getState()).toEqual(true);
    expect($yourMessageError.getState()).toEqual(true);
    onFullNameChange('Boris');
    onOrganizationChange('RT');
    onPurposeChange('Test');
    onYourMessageChange('Test');
    expect($fullNameError.getState()).toEqual(false);
    expect($organizationError.getState()).toEqual(false);
    expect($purposeError.getState()).toEqual(false);
    expect($yourMessageError.getState()).toEqual(false);
  });
});

