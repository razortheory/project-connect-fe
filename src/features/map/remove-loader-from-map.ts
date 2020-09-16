import { removeLoaderFromMapFx } from './model';

removeLoaderFromMapFx.use((loader) => {
  loader?.remove();
});
