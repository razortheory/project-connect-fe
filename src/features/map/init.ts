import {
  $mapTheme,
  $mapZoom,
  changeMapTheme,
  changeZoom,
  decrementZoom,
  incrementZoom,
} from './model';

const minZoom = 0;
const maxZoom = 22;

$mapTheme.on(changeMapTheme, (state, theme) => theme);
$mapZoom
  .on(incrementZoom, (state) => Math.min(maxZoom, state + 1))
  .on(decrementZoom, (state) => Math.max(minZoom, state - 1))
  .on(changeZoom, (state, zoom) => zoom);
