import mapboxGL from 'mapbox-gl';

import { setPayload } from '~/lib/effector-kit';

import { $loader, addLoaderToMapFx, setLoader } from './model';

$loader.on(setLoader, setPayload);

addLoaderToMapFx.use((map) => {
  if (!map) return;

  // create loader
  // a loader with animation that is not wrapped in a container is displayed incorrectly
  const loader = document.createElement('div');
  loader.className = 'map-loader';
  const loaderWrapper = document.createElement('div');
  loaderWrapper.append(loader);

  // add loader
  const loaderMarker = new mapboxGL.Marker(loaderWrapper)
    .setLngLat(map.getCenter())
    .addTo(map);

  // always display the loader in the center
  map.on('zoom', () => {
    if (loaderMarker) {
      loaderMarker.setLngLat(map.getCenter());
    }
  });

  map.on('move', () => {
    if (loaderMarker) {
      loaderMarker.setLngLat(map.getCenter());
    }
  });
  setLoader(loaderMarker);
});
