import presetEnv from 'postcss-preset-env';
import normalize from 'postcss-normalize';
import flexBugsFixes from 'postcss-flexbugs-fixes';

import { isDevelopment } from './env';

export const postcssConfig = {
  plugins: [
    presetEnv({
      stage: 2,
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
    }),
    flexBugsFixes(),
    normalize(),
  ],
  sourceMap: isDevelopment,
};
