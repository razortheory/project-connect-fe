import React from 'react';
import styled from 'styled-components';
import { Counter } from '~/features/counter';
import { Hello } from '~/features/hello';
import LogoSvg from '~/assets/logo.svg';
import { Map } from '~/features/map';

const Main = styled.div`
  padding: 8px;
`;

const Logo = styled(LogoSvg)`
  width: 64px;
`;

const OverMap = styled.div`
  position: absolute;
  z-index: 2;
  background-color: #fff;
`;

export const View = () => (
  <Main>
    <OverMap>
      <Hello greeting="Hello world!" />
      <hr />
      <Counter />
      <Logo />
    </OverMap>
    <Map />
  </Main>
);

export const Root = View;
