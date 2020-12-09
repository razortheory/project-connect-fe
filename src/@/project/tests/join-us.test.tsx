// eslint-disable-next-line jest/no-mocks-import,no-restricted-imports
import '../../../../__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { $fullNameError } from '@/project/model';
import { JoinUs } from '@/project/ui';

let container = (null as unknown) as Element;

describe('Join Us Form tests', () => {
  beforeEach(() => {
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
      render(<JoinUs/>, container);
    });

    const button = document.querySelector('[type=submit]') as HTMLButtonElement;

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect($fullNameError.getState()).toBe(true);
  });

});
