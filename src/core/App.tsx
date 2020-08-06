import '~/styles';
import '~/fonts';

import React from 'react';
import { Counter } from '~/features/counter';
import { Hello } from '~/features/hello';

export const View = (): JSX.Element => (
  <>
    <Hello greeting="Hello world!" />
    <hr />
    <Counter />
  </>
);

export const App = View;
