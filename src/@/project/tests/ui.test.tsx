// eslint-disable-next-line jest/no-mocks-import,no-restricted-imports
import '../../../../__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import * as init from '@/project/init';
import { onJoinUsFormSubmit } from '@/project/model';
import { JoinUs } from '@/project/ui';

let container = (null as unknown) as Element;

describe('Join Us Form tests', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    init;
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
      '#fullNameError'
    ) as HTMLDivElement;
    const purposeError = document.querySelector(
      '#fullNameError'
    ) as HTMLDivElement;
    const yourMessageError = document.querySelector(
      '#fullNameError'
    ) as HTMLDivElement;
    expect(fullNameErrorContainer.textContent).toEqual(
      'This field is required'
    );
    expect(organizationError.textContent).toEqual('This field is required');
    expect(purposeError.textContent).toEqual('This field is required');
    expect(yourMessageError.textContent).toEqual('This field is required');
  });
});
