/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
*/

import '../../../__mocks__/match-media';

import { sendJoinUsFormMockFx } from '~/__mocks__/sendJoinUsFormMockFx';
import { sendJoinUsFormFx } from '~/api/project-connect';

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

  it('error values should be equal false when change event is being called with non empty value', () => {
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
  it('fields states should be cleared after clearFormFields called', async () => {
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
    expect(Model.$fullName.getState()).toEqual('Boris');
    expect(Model.$organization.getState()).toEqual('RT');
    expect(Model.$purpose.getState()).toEqual('Test');
    expect(Model.$yourMessage.getState()).toEqual('Test');
    expect(Model.$fullNameError.getState()).toEqual(false);
    expect(Model.$organizationError.getState()).toEqual(false);
    expect(Model.$purposeError.getState()).toEqual(false);
    expect(Model.$yourMessageError.getState()).toEqual(false);

    const formFields = {
      fullName: Model.$fullName.getState(),
      organization: Model.$organization.getState(),
      purpose: Model.$purpose.getState(),
      yourMessage: Model.$yourMessage.getState(),
    };
    sendJoinUsFormFx.use(sendJoinUsFormMockFx);
    const result = await sendJoinUsFormFx(formFields);
    const expectedResult = {
      full_name: 'Boris',
      organisation: 'OOO RT',
      purpose: 'Test',
      message: 'Test',
    };
    expect(result).toEqual(expectedResult);
    Model.clearFormFields();
    expect(Model.$fullName.getState()).toEqual('');
    expect(Model.$organization.getState()).toEqual('');
    expect(Model.$purpose.getState()).toEqual('');
    expect(Model.$yourMessage.getState()).toEqual('');
  });
});
