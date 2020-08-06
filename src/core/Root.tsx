import React from 'react';
import styled from 'styled-components';
import { Counter } from '~/features/counter';
import { Hello } from '~/features/hello';
import LogoSvg from '~/assets/logo.svg';

const Main = styled.div`
  padding: 8px;
`;

const Logo = styled(LogoSvg)`
  width: 64px;
`;

export const View = () => (
  <Main>
    <Hello greeting="Hello world!" />
    <hr />
    <Counter />
    <Logo />
  </Main>
);

export const Root = View;
