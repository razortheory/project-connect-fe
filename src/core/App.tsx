import React from 'react';
import { GlobalStyle } from './style';
import { Root } from './Root';

import '~/assets/fonts/styles';
import '~/assets/styles/app.scss';

export const App = (): JSX.Element => (
  <>
    <GlobalStyle />
    <Root />
  </>
);
