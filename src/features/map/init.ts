import './country/init';
import './init-map';
import './add-loader-to-map';
import './remove-loader-from-map';

import { combine, guard, sample } from 'effector';

import { fetchGlobalStatsData } from '~/features/map/api';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { stylePaintData } from './constants';
import { fetchCountriesDataFx, fetchCountriesGeometryDataFx } from './country';
import { fetchCountryDataFx, fetchCountrySchoolsFx } from './country/model';
import {
  $globalStats,
  $loader,
  $map,
  $pending,
  $style,
  $stylePaintData,
  addLoaderToMapFx,
  changeMap,
  changeStyle,
  fetchGlobalStatsDataFx,
  initMapFx,
  removeLoaderFromMapFx,
  setCenter,
  zoomIn,
  zoomOut,
} from './model';

$map.on(changeMap, setPayload);
$style.on(changeStyle, setPayload);

fetchGlobalStatsDataFx.use(fetchGlobalStatsData);

$globalStats.on(fetchGlobalStatsDataFx.doneData, setPayload);

sample({
  source: $style,
  fn: (style) => stylePaintData[style],
  target: $stylePaintData,
});

// Update pending status
sample({
  source: combine([
    fetchCountrySchoolsFx.pending,
    fetchCountryDataFx.pending,
    fetchCountriesDataFx.pending,
    fetchCountriesGeometryDataFx.pending,
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
