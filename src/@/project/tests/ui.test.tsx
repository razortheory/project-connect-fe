/* eslint-disable jest/no-mocks-import */
import '~/__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

import { sendJoinUsFormMockFx } from '~/__mocks__/sendJoinUsFormMockFx';
import { sendJoinUsFormFx } from '~/api/project-connect';

import * as init from '@/project/init';
import { clearFormFields, onJoinUsFormSubmit } from '@/project/model';
import { JoinUs } from '@/project/ui';

let container = (null as unknown) as Element;

describe('Join Us Form tests', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    init;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sendJoinUsFormFx;
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = (null as unknown) as Element;
  });

  it('error values should be changed when submit button clicked', () => {
    act(() => {
      render(<JoinUs />, container);
    });
    const button = document.querySelector('[type=submit]') as HTMLButtonElement;
    const spy = jest.fn();
    onJoinUsFormSubmit.watch(spy);
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spy).toHaveBeenCalled();

    const fullNameErrorContainer = document.querySelector(
      '#fullNameError'
    ) as HTMLDivElement;
    const organizationError = document.querySelector(
      '#organizationError'
    ) as HTMLDivElement;
    const purposeError = document.querySelector(
      '#purposeError'
    ) as HTMLDivElement;
    const yourMessageError = document.querySelector(
      '#yourMessageError'
    ) as HTMLDivElement;
    expect(fullNameErrorContainer.textContent).toEqual(
      'This field is required'
    );
    expect(organizationError.textContent).toEqual('This field is required');
    expect(purposeError.textContent).toEqual('This field is required');
    expect(yourMessageError.textContent).toEqual('This field is required');
  });

  it('errors should be disappeared when inputs have no empty values', () => {
    act(() => {
      render(<JoinUs />, container);
    });
    const button = document.querySelector('[type=submit]') as HTMLButtonElement;
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    let fullNameErrorContainer = document.querySelector(
      '#fullNameError'
    ) as HTMLDivElement;
    let organizationError = document.querySelector(
      '#organizationError'
    ) as HTMLDivElement;
    let purposeError = document.querySelector(
      '#purposeError'
    ) as HTMLDivElement;
    let yourMessageError = document.querySelector(
      '#yourMessageError'
    ) as HTMLDivElement;
    expect(fullNameErrorContainer.textContent).toEqual(
      'This field is required'
    );
    expect(organizationError.textContent).toEqual('This field is required');
    expect(purposeError.textContent).toEqual('This field is required');
    expect(yourMessageError.textContent).toEqual('This field is required');

    const fullNameInput = document.querySelector('#name') as HTMLInputElement;
    const organizationInput = document.querySelector(
      '#organization'
    ) as HTMLInputElement;
    const purposeInput = document.querySelector('#purpose') as HTMLInputElement;
    const yourMessageInput = document.querySelector(
      '#message'
    ) as HTMLInputElement;
    act(() => {
      fullNameInput.value = 'Boris';
      ReactTestUtils.Simulate.change(fullNameInput);
      organizationInput.value = 'OOO RT';
      ReactTestUtils.Simulate.change(organizationInput);
      purposeInput.value = 'Test';
      ReactTestUtils.Simulate.change(purposeInput);
      yourMessageInput.value = 'Test';
      ReactTestUtils.Simulate.change(yourMessageInput);
    });

    fullNameErrorContainer = document.querySelector(
      '#fullNameError'
    ) as HTMLDivElement;
    organizationError = document.querySelector(
      '#organizationError'
    ) as HTMLDivElement;
    purposeError = document.querySelector('#purposeError') as HTMLDivElement;
    yourMessageError = document.querySelector(
      '#yourMessageError'
    ) as HTMLDivElement;
    expect(fullNameErrorContainer).toBeNull();
    expect(organizationError).toBeNull();
    expect(purposeError).toBeNull();
    expect(yourMessageError).toBeNull();
  });

  it('sendJoinUsFormFx should be called when submit button is clicked and field values are not empty', () => {
    act(() => {
      render(<JoinUs />, container);
    });

    const fullNameInput = document.querySelector('#name') as HTMLInputElement;
    const organizationInput = document.querySelector(
      '#organization'
    ) as HTMLInputElement;
    const purposeInput = document.querySelector('#purpose') as HTMLInputElement;
    const yourMessageInput = document.querySelector(
      '#message'
    ) as HTMLInputElement;

    act(() => {
      fullNameInput.value = 'Boris';
      ReactTestUtils.Simulate.change(fullNameInput);
      organizationInput.value = 'OOO RT';
      ReactTestUtils.Simulate.change(organizationInput);
      purposeInput.value = 'Test';
      ReactTestUtils.Simulate.change(purposeInput);
      yourMessageInput.value = 'Test';
      ReactTestUtils.Simulate.change(yourMessageInput);
    });
    sendJoinUsFormFx.use(sendJoinUsFormMockFx);
    const spy = jest.fn();
    sendJoinUsFormFx.watch(spy);
    const button = document.querySelector('[type=submit]') as HTMLButtonElement;
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spy).toHaveBeenCalled();
  });

  it('form values should be cleared when form is submitted', async () => {
    act(() => {
      render(<JoinUs />, container);
    });

    const fullNameInput = document.querySelector('#name') as HTMLInputElement;
    const organizationInput = document.querySelector(
      '#organization'
    ) as HTMLInputElement;
    const purposeInput = document.querySelector('#purpose') as HTMLInputElement;
    const yourMessageInput = document.querySelector(
      '#message'
    ) as HTMLInputElement;

    onJoinUsFormSubmit();
    act(() => {
      fullNameInput.value = 'Boris';
      ReactTestUtils.Simulate.change(fullNameInput);
      organizationInput.value = 'OOO RT';
      ReactTestUtils.Simulate.change(organizationInput);
      purposeInput.value = 'Test';
      ReactTestUtils.Simulate.change(purposeInput);
      yourMessageInput.value = 'Test';
      ReactTestUtils.Simulate.change(yourMessageInput);
    });
    const formFields = {
      fullName: fullNameInput.value,
      organization: organizationInput.value,
      purpose: purposeInput.value,
      yourMessage: yourMessageInput.value,
    };
    sendJoinUsFormFx.use(sendJoinUsFormMockFx);
    const spy = jest.fn();
    clearFormFields.watch(spy);
    const result = await sendJoinUsFormFx(formFields);
    const expectedResult = {
      full_name: 'Boris',
      organisation: 'OOO RT',
      purpose: 'Test',
      message: 'Test',
    };
    expect(result).toEqual(expectedResult);
    expect(spy).toHaveBeenCalled();
    expect(fullNameInput.value).toEqual('');
    expect(organizationInput.value).toEqual('');
    expect(purposeInput.value).toEqual('');
    expect(yourMessageInput.value).toEqual('');
  });
});
