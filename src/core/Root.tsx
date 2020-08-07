import React from 'react';
import styled from 'styled-components';
import { Counter } from '~/features/counter';
import { Hello } from '~/features/hello';
import { Map } from '~/features/map';

const Main = styled.div`
  padding: 8px;
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
    </OverMap>
    <Map />
  </Main>
);

export const Root = View;
