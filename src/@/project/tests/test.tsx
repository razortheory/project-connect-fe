import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import {
  $fullNameError,
  $organizationError,
  $purposeError,
  $yourMessageError
} from '@/project/model';
import { JoinUs } from '@/project/ui';

let container = null as unknown as Element;
beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  container.remove();
  container = null as unknown as Element;
});

it("changes value when clicked", () => {

  act(() => {
    render(<JoinUs />, container);
  });

  const button = document.querySelector("[type=submit]");

  act(() => {
    button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect($organizationError.getState()).toEqual(true);
  expect($purposeError.getState()).toEqual(true);
  expect($fullNameError.getState()).toEqual(true);
  expect($yourMessageError.getState()).toEqual(true);
});
