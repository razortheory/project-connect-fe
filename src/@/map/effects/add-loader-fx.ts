import { createEffect } from 'effector';
import mapboxGL from 'mapbox-gl';

import { setLoader } from '@/map/model';
import { Map } from '@/map/types';

export const addLoaderToMapFx = createEffect((map: Map | null) => {
  if (!map) return;

  // Create loader (should be wrapped in a container)
  const loader = document.createElement('div');
  loader.className = 'map-loader';
  const loaderWrapper = document.createElement('div');
  loaderWrapper.append(loader);

  // Add loader
  const loaderMarker = new mapboxGL.Marker(loaderWrapper)
    .setLngLat(map.getCenter())
    .addTo(map);

  // Always display the loader in the center
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
