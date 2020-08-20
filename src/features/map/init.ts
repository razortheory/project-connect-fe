import {
  $mapTheme,
  $mapZoom,
  changeMapTheme,
  decrementZoom,
  incrementZoom,
} from './model';

const minZoom = 0;
const maxZoom = 22;

$mapTheme.on(changeMapTheme, (state, theme) => theme);
$mapZoom
  .on(incrementZoom, (state) => (state + 1 <= maxZoom ? state + 1 : state))
  .on(decrementZoom, (state) => (state - 1 >= minZoom ? state - 1 : state));
