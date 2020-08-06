import React from 'react';
import styled from 'styled-components';
import { Counter } from '~/features/counter';
import { Hello } from '~/features/hello';

const Main = styled.div`
  padding: 8px;
`;

export const View = () => (
  <Main>
    <Hello greeting="Hello world!" />
    <hr />
    <Counter />
  </Main>
);

export const Root = View;
