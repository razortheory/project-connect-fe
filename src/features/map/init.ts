import './country/init';

import { combine, guard, sample } from 'effector';
import { FeatureCollection } from 'geojson';
import mapboxGL, { MapLayerMouseEvent } from 'mapbox-gl';

import { mapCountry } from '~/core/routes';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { request } from './api';
import {
  defaultCenter,
  defaultZoom,
  stylePaintData,
  styleUrls,
} from './constants';
import { changeCountryIdFx } from './country/model';
import { combineCountriesDataToGeoJson } from './map-data-helpers';
import {
  $countriesData,
  $countriesFeatureCollection,
  $countriesGeometryData,
  $map,
  $pending,
  $selectedCountryId,
  $style,
  $stylePaintData,
  changeCountryId,
  changeMap,
  changeStyle,
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
  initMap,
  setCenter,
  zoomIn,
  zoomOut,
} from './model';
import {
  CountryData,
  CountryGeometryData,
  InitMapOptions,
  StylePaintData,
} from './types';

const fetchCountriesData = async () =>
  request<CountryData[]>('api/locations/countries/');

const fetchCountriesGeometryData = async () =>
  request<CountryGeometryData[]>('api/locations/countries-boundary/');

fetchCountriesDataFx.use(fetchCountriesData);
fetchCountriesGeometryDataFx.use(fetchCountriesGeometryData);

$map.on(changeMap, setPayload);
$style.on(changeStyle, setPayload);
$countriesData.on(fetchCountriesDataFx.doneData, setPayload);
$countriesGeometryData.on(fetchCountriesGeometryDataFx.doneData, setPayload);
$selectedCountryId.on(changeCountryId, setPayload);

const onLeaveMapCountry = guard(mapCountry.visible, {
  filter: (visible) => !visible,
});

const allCountriesDataLoaded = guard({
  source: combine([$countriesData, $countriesGeometryData]),
  filter: ([countriesData, countriesGeometryData]) =>
    Boolean(countriesData && countriesGeometryData),
});

$countriesFeatureCollection.on(
  allCountriesDataLoaded,
  (_, [countriesData, countriesGeometryData]) =>
    combineCountriesDataToGeoJson(countriesData, countriesGeometryData)
);

sample({
  source: $style,
  fn: (style) => stylePaintData[style],
  target: $stylePaintData,
});

sample({
  source: guard(mapCountry.params, { filter: Boolean }),
  fn: (params) => Number(params?.id),
  target: changeCountryId,
});

sample({
  source: mapCountry.params,
  clock: changeMap,
  fn: (params) => (params?.id ? Number(params.id) : 0),
  target: changeCountryId,
});

const $mapScope = combine({
  map: $map,
  paintData: $stylePaintData,
});

const onMapInit = sample({
  source: guard($countriesFeatureCollection, { filter: Boolean }),
  clock: changeMap,
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
    changeCountryIdFx.pending,
    // Other effects
  ]),
  fn: (states) => states.some(Boolean),
  target: $pending,
});

$map.watch(guard($pending, { filter: Boolean }), addLoaderToMap);
$map.watch(guard($pending, { filter: getInverted }), () => {
  loaderMarker?.remove();
});

const addCountriesToMap = (
  map: mapboxGL.Map | null,
  paintData: StylePaintData,
  countriesGeometry: FeatureCollection
) => {
  let hoveredCountryId = 0;
  if (!countriesGeometry) {
    return;
  }

  map?.addSource('countries', {
    type: 'geojson',
    data: countriesGeometry,
  });

  map?.addLayer({
    id: 'countries',
    type: 'fill',
    source: 'countries',
    paint: {
      'fill-color': [
        'match',
        ['get', 'integration_status'],
        0,
        paintData.countryNotVerified,
        1,
        paintData.countryVerified,
        2,
        paintData.countryWithConnectivity,
        3,
        paintData.countryWithConnectivity,
        paintData.countryNotVerified,
      ],
      'fill-outline-color': paintData.background,
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        paintData.opacityHover,
        paintData.opacity,
      ],
    },
  });

  // remove loader after loading data
  if (loaderMarker) {
    loaderMarker.remove();
  }

  map?.on('click', 'countries', (event: MapLayerMouseEvent) => {
    if (!event.features || !event.features[0]) {
      return;
    }
    mapCountry.navigate({ id: event.features[0].id as number });
  });

  map?.on('mouseenter', 'countries', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = 'pointer';
  });

  map?.on('mouseleave', 'countries', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = '';
  });

  map?.on('mousemove', 'countries', (event: MapLayerMouseEvent) => {
    if (!event.features || !event.features[0]) {
      return;
    }
    if (event.features.length > 0) {
      if (hoveredCountryId) {
        map.setFeatureState(
          { source: 'countries', id: hoveredCountryId },
          { hover: false }
        );
      }
      hoveredCountryId = event.features[0].id as number;
      map.setFeatureState(
        { source: 'countries', id: hoveredCountryId },
        { hover: true }
      );
    }
  });

  // When the mouse leaves the countries layer, update the country state of the
  // previously hovered feature.
  map?.on('mouseleave', 'countries', () => {
    if (hoveredCountryId) {
      map.setFeatureState(
        { source: 'countries', id: hoveredCountryId },
        { hover: false }
      );
    }
    hoveredCountryId = 0;
  });
};

const removeSchoolsFromMap = (map: mapboxGL.Map | null) => {
  if (map?.getLayer('schools')) {
    map.removeLayer('schools');
  }
  if (map?.getSource('schools')) {
    map.removeSource('schools');
  }
};

const removeSelectedCountry = (map: mapboxGL.Map | null) => {
  if (map?.getLayer('selectedCountry')) {
    map.removeLayer('selectedCountry');
  }
  if (map?.getSource('selectedCountry')) {
    map.removeSource('selectedCountry');
  }
};

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

$mapScope.watch(
  $countriesFeatureCollection,
  ({ map, paintData }, countriesGeometry: FeatureCollection | null) => {
    if (!countriesGeometry) {
      return;
    }
    addCountriesToMap(map, paintData, countriesGeometry);
  }
);

$mapScope.watch(onMapInit, ({ map, paintData }, countriesGeometry) => {
  addCountriesToMap(map, paintData, countriesGeometry);
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

$mapScope.watch(onLeaveMapCountry, ({ map, paintData }) => {
  map?.flyTo({
    center: defaultCenter,
    zoom: defaultZoom,
  });
  map?.setPaintProperty('countries', 'fill-color', [
    'match',
    ['get', 'integration_status'],
    0,
    paintData.countryNotVerified,
    1,
    paintData.countryVerified,
    2,
    paintData.countryWithConnectivity,
    3,
    paintData.countryWithConnectivity,
    paintData.countryNotVerified,
  ]);
  map?.setPaintProperty(
    'countries',
    'fill-outline-color',
    paintData.background
  );
  removeSchoolsFromMap(map);
  removeSelectedCountry(map);
});
