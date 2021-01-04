/* eslint-disable jest/no-mocks-import */
// eslint-disable-next-line no-restricted-imports
import '~/../src/__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

// eslint-disable-next-line no-restricted-imports
import { sendJoinUsFormMockFx } from '~/../src/__mocks__/sendJoinUsFormMockFx';
import { sendJoinUsFormFx } from '~/api/project-connect';

import * as init from '@/project/init';
import { $purpose, clearFormFields, onJoinUsFormSubmit } from '@/project/model';
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
    const yourMessageInput = document.querySelector(
      '#message'
    ) as HTMLInputElement;

    act(() => {
      fullNameInput.value = 'Boris';
      ReactTestUtils.Simulate.change(fullNameInput);
      organizationInput.value = 'OOO RT';
      ReactTestUtils.Simulate.change(organizationInput);
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
    const yourMessageInput = document.querySelector(
      '#message'
    ) as HTMLInputElement;

    act(() => {
      fullNameInput.value = 'Boris';
      ReactTestUtils.Simulate.change(fullNameInput);
      organizationInput.value = 'OOO RT';
      ReactTestUtils.Simulate.change(organizationInput);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      $purpose.setState('I want to join');
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
    const yourMessageInput = document.querySelector(
      '#message'
    ) as HTMLInputElement;

    onJoinUsFormSubmit();
    act(() => {
      fullNameInput.value = 'Boris';
      ReactTestUtils.Simulate.change(fullNameInput);
      organizationInput.value = 'OOO RT';
      ReactTestUtils.Simulate.change(organizationInput);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      $purpose.setState('I want to join');
      yourMessageInput.value = 'Test';
      ReactTestUtils.Simulate.change(yourMessageInput);
    });
    const formFields = {
      fullName: fullNameInput.value,
      organization: organizationInput.value,
      purpose: $purpose.getState(),
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
    expect($purpose.getState()).toEqual('');
    expect(yourMessageInput.value).toEqual('');
  });
});

describe('Join Us page tabs', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = (null as unknown) as Element;
  });
  it('tabs content default state', () => {
    act(() => {
      render(<JoinUs />, container);
    });
    const contentContainer = document.querySelector(
      '.partnership__default-description'
    ) as HTMLDivElement;
    expect(contentContainer.textContent).toEqual(
      'Select your organisation type to see how we can work together'
    );
  });

  it('tabs content should be changed when tab button is clicked', () => {
    act(() => {
      render(<JoinUs />, container);
    });
    const button = document.querySelector(
      '[name=government]'
    ) as HTMLButtonElement;

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const contentContainer = document.querySelector(
      '.partnership__title'
    ) as HTMLDivElement;
    const titlesContainer = document.querySelectorAll('.partnership__title');
    const descriptionsContainer = document.querySelectorAll(
      '.partnership__description'
    );
    expect(contentContainer.textContent).toEqual(
      'Map school connectivity in your country'
    );
    expect(titlesContainer[0].textContent).toEqual(
      'Map school connectivity in your country'
    );
    expect(titlesContainer[1].textContent).toEqual('Share your data');
    expect(titlesContainer[2].textContent).toEqual('Provide funding');
    expect(titlesContainer[3].textContent).toEqual(
      'Contribute with engineering and data science capacity'
    );
    expect(titlesContainer[4].textContent).toEqual(
      'Collaborate on joint research'
    );
    expect(descriptionsContainer[0].textContent).toEqual(
      'If you are a country government interested in joining, you can ' +
        'contact us and we will help you map every school and connectivity status in your country.'
    );
    expect(descriptionsContainer[1].textContent).toEqual(
      'We are looking for information on locations of schools and their ' +
        'level of online connectivity. However, any piece of information about schools that you are interested in sharing, no matter how ' +
        'small, is extremely useful.'
    );
    expect(descriptionsContainer[2].textContent).toEqual(
      'You can provide funding to support Project Connect’s platform, and ' +
        'help other countries get their maps.'
    );
    expect(descriptionsContainer[3].textContent).toEqual(
      'Help us build the Project Connect platform and tech solutions to ' +
        'accelerate the mapping work globally.'
    );
    expect(descriptionsContainer[4].textContent).toEqual(
      'We can conduct joint research on topics such as the impact of ' +
        'connectivity in outcomes, optimization of service delivery or deep learning for automatic mapping.'
    );
  });
});
