import './country/init';

import { combine, guard, sample } from 'effector';
import mapboxGL from 'mapbox-gl';

import { getInverted, setPayload } from '~/lib/effector-kit';

import {
  defaultCenter,
  defaultZoom,
  stylePaintData,
  styleUrls,
} from './constants';
import {
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
  updateCountryFx,
  updateSchoolsFx,
} from './country';
import {
  $map,
  $pending,
  $style,
  $stylePaintData,
  changeMap,
  changeStyle,
  initMap,
  setCenter,
  zoomIn,
  zoomOut,
} from './model';
import { InitMapOptions } from './types';

$map.on(changeMap, setPayload);
$style.on(changeStyle, setPayload);

sample({
  source: $style,
  fn: (style) => stylePaintData[style],
  target: $stylePaintData,
});

let loaderMarker: mapboxGL.Marker | undefined;
// create loader
// a loader with animation that is not wrapped in a container is displayed incorrectly
const loader = document.createElement('div');
loader.className = 'map-loader';
const loaderWrapper = document.createElement('div');
loaderWrapper.append(loader);

const addLoaderToMap = (map: mapboxGL.Map | null) => {
  if (!map) return;

  // add loader
  loaderMarker = new mapboxGL.Marker(loaderWrapper)
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
};

// Update pending status
sample({
  source: combine([
    updateSchoolsFx.pending,
    updateCountryFx.pending,
    fetchCountriesDataFx.pending,
    fetchCountriesGeometryDataFx.pending,
    // Other effects
  ]),
  fn: (states) => states.some(Boolean),
  target: $pending,
});

$map.watch(guard($pending, { filter: Boolean }), addLoaderToMap);
$map.watch(guard($pending, { filter: getInverted }), () => {
  loaderMarker?.remove();
});

initMap.watch(({ style, container, center, zoom }: InitMapOptions) => {
  const map = new mapboxGL.Map({
    style: styleUrls[style],
    center: center ?? defaultCenter,
    zoom: zoom ?? defaultZoom,
    container,
  });

  addLoaderToMap(map);

  map.on('load', () => {
    changeMap(map);
  });
});

$map.watch(zoomIn, (map) => {
  map?.zoomIn({ duration: 500 });
});

$map.watch(zoomOut, (map) => {
  map?.zoomOut({ duration: 500 });
});

$map.watch(setCenter, (map, center) => {
  map?.setCenter(center);
});

$map.watch(changeStyle, (map, style) => {
  if (!map) return;

  initMap({
    container: map.getContainer(),
    zoom: map.getZoom(),
    center: map.getCenter(),
    style,
  });
});
