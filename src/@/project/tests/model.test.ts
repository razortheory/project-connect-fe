/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
*/

import '../../../../__mocks__/match-media';

describe('Join Us Form tests', () => {
  let Model: any;
  let Init;
  beforeEach(() => {
    jest.resetModules();
    Model = require('@/project/model');
    Init = require('@/project/init');
    Model;
    Init;
  });
  it('error values should be changed when onJoinUsFormSubmit called', () => {
    expect(Model.$fullNameError.getState()).toEqual(false);
    expect(Model.$organizationError.getState()).toEqual(false);
    expect(Model.$purposeError.getState()).toEqual(false);
    expect(Model.$yourMessageError.getState()).toEqual(false);
    Model.onJoinUsFormSubmit();
    expect(Model.$fullNameError.getState()).toEqual(true);
    expect(Model.$organizationError.getState()).toEqual(true);
    expect(Model.$purposeError.getState()).toEqual(true);
    expect(Model.$yourMessageError.getState()).toEqual(true);
  });

  it('Error values should be equal false when change event is being called with non empty value', () => {
    expect(Model.$fullNameError.getState()).toEqual(false);
    expect(Model.$organizationError.getState()).toEqual(false);
    expect(Model.$purposeError.getState()).toEqual(false);
    expect(Model.$yourMessageError.getState()).toEqual(false);
    Model.onJoinUsFormSubmit();
    expect(Model.$fullNameError.getState()).toEqual(true);
    expect(Model.$organizationError.getState()).toEqual(true);
    expect(Model.$purposeError.getState()).toEqual(true);
    expect(Model.$yourMessageError.getState()).toEqual(true);
    Model.onFullNameChange('Boris');
    Model.onOrganizationChange('RT');
    Model.onPurposeChange('Test');
    Model.onYourMessageChange('Test');
    expect(Model.$fullNameError.getState()).toEqual(false);
    expect(Model.$organizationError.getState()).toEqual(false);
    expect(Model.$purposeError.getState()).toEqual(false);
    expect(Model.$yourMessageError.getState()).toEqual(false);
  });
});
