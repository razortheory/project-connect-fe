import { combine, guard, sample } from 'effector';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchCountryFx,
  fetchGlobalStatsFx,
  fetchSchoolsFx,
  fetchSchoolsGlobal,
} from '~/api/project-connect';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { stylePaintData } from './constants';
import { addLoaderToMapFx, initMapFx, removeLoaderFromMapFx } from './effects';
import {
  $globalStats,
  $loader,
  $map,
  $mapType,
  $pending,
  $style,
  $stylePaintData,
  changeMap,
  changeMapType,
  changeStyle,
  setCenter,
  setLoader,
  zoomIn,
  zoomOut,
} from './model';

$map.on(changeMap, setPayload);
$style.on(changeStyle, setPayload);
$globalStats.on(fetchGlobalStatsFx.doneData, setPayload);
$loader.on(setLoader, setPayload);
$mapType.on(changeMapType, setPayload);

sample({
  source: $style,
  fn: (style) => stylePaintData[style],
  target: $stylePaintData,
});

// Update pending status
sample({
  source: combine([
    fetchSchoolsFx.pending,
    fetchCountryFx.pending,
    fetchCountriesFx.pending,
    fetchCountriesGeometryFx.pending,
    fetchSchoolsGlobal.pending,
    // Other effects
  ]),
  fn: (states) => states.some(Boolean),
  target: $pending,
});

sample({
  source: guard($map, { filter: Boolean }),
  clock: changeStyle,
  fn: (map, style) => ({
    container: map.getContainer(),
    zoom: map.getZoom(),
    center: map.getCenter(),
    style,
  }),
  target: initMapFx,
});

sample({
  source: $map,
  clock: guard({
    source: combine([$pending, $map]),
    filter: ([pending, map]) => Boolean(pending && map),
  }),
  target: addLoaderToMapFx,
});

sample({
  source: $loader,
  clock: guard($pending, { filter: getInverted }),
  target: removeLoaderFromMapFx,
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
