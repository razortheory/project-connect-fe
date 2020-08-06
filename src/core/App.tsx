import React from 'react';
import { GlobalStyle } from './styles';
import { Root } from './Root';

import '~/fonts';

export const View = () => (
  <>
    <GlobalStyle />
    <Root />
  </>
);

export const App = View;
