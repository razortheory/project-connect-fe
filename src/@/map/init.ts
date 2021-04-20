import { combine, guard, sample } from 'effector';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchCountryFx,
  fetchGlobalStatsFx,
  fetchSchoolsFx,
  fetchSchoolsGlobal,
} from '~/api/project-connect';
import { project } from '~/core/routes';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { changeCountryCode } from '@/country/model';
import {
  addLoaderToMapFx,
  changeStyleFx,
  initMapFx,
  removeLoaderFromMapFx,
} from '@/map/effects';

import { stylePaintData } from './constants';
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
$mapType.reset(changeCountryCode);

// Reset map after leave map page
$map.reset(guard(project.visible, { filter: Boolean }));

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
    initMapFx.pending,
    // Other effects
  ]),
  fn: (states) => states.some(Boolean),
  target: $pending,
});

sample({
  source: guard($map, { filter: Boolean }),
  clock: changeStyle,
  fn: (map, style) => ({
    map,
    style,
  }),
  target: changeStyleFx,
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
