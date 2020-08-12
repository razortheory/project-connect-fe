// Entry point
import { createElement } from 'react';
import { render } from 'react-dom';
import { HotApp } from './core';

const rootElement = document.querySelector('div');

const renderApp = (): void => {
  render(createElement(HotApp), rootElement);
};

renderApp();

// Hot reloading
if (module.hot) {
  module.hot.accept(renderApp);
}
