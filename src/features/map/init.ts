import { combine, guard, sample } from 'effector';
import {
  FeatureCollection,
  Geometry,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
import mapboxGL, { MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';

import { mapCountry } from '~/core/routes';
import { setPayload } from '~/lib/effector-kit';
import { createRequest } from '~/lib/request';

import {
  connectivityStatusPaintData,
  countriesPaintData,
  defaultCenter,
  defaultZoom,
  styleUrls,
} from './constants';
import {
  combineCountriesDataToGeoJson,
  convertSchoolsDataToGeoJson,
  getPolygonBoundingBox,
} from './map-data-helpers';
import {
  $countriesData,
  $countriesFeatureCollection,
  $countriesGeometryData,
  $map,
  $selectedCountryId,
  $style,
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
  SchoolData,
  Style,
} from './types';

// create request
const request = createRequest({
  baseUrl: 'https://api.projectconnect.razortheory.com/',
});

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
  style: $style,
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
  if (!map) {
    return;
  }
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

const addCountriesToMap = (
  map: mapboxGL.Map | null,
  style: Style,
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

  const paintData = countriesPaintData[style];

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
    // remove loader after loading data
    if (loaderMarker) {
      loaderMarker.remove();
    }
    changeMap(map);
  });
});

$mapScope.watch(
  $countriesFeatureCollection,
  ({ map, style }, countriesGeometry: FeatureCollection | null) => {
    if (!countriesGeometry) {
      return;
    }
    addCountriesToMap(map, style, countriesGeometry);
  }
);

$mapScope.watch(onMapInit, ({ map, style }, countriesGeometry) => {
  addCountriesToMap(map, style, countriesGeometry);
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

$mapScope.watch(changeCountryId, async ({ map, style }, countryId) => {
  if (!countryId) {
    return;
  }

  removeSelectedCountry(map);
  removeSchoolsFromMap(map);
  addLoaderToMap(map);

  const countryData = await request<CountryData>(
    `api/locations/countries/${countryId}/`
  );

  map?.addSource('selectedCountry', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: countryData.geometry as Geometry,
      properties: {},
    },
  });
  const paintData = countriesPaintData[style];
  map?.addLayer({
    id: 'selectedCountry',
    type: 'fill',
    source: 'selectedCountry',
    paint: {
      'fill-color': paintData.countrySelected,
      'fill-opacity': paintData.opacity,
      'fill-outline-color': paintData.background,
    },
  });
  map?.setPaintProperty(
    'countries',
    'fill-color',
    paintData.countryNotSelected
  );
  map?.setPaintProperty('countries', 'fill-outline-color', [
    'case',
    ['==', ['id'], countryId],
    paintData.countryNotSelected,
    paintData.background,
  ]);

  const bounds = getPolygonBoundingBox(
    countryData.geometry as Polygon | MultiPolygon
  );
  map?.fitBounds(bounds, {
    padding: { left: 360, right: 30, top: 30, bottom: 30 },
  });

  const points = await request<FeatureCollection>({
    url: `api/locations/countries/${countryId}/schools/`,
    fn: ({ jsonData }) => convertSchoolsDataToGeoJson(jsonData as SchoolData[]),
  });

  loaderMarker?.remove();

  if (points.features.length > 0) {
    map?.addSource('schools', {
      type: 'geojson',
      data: points,
    });

    map?.addLayer({
      id: 'schools',
      type: 'circle',
      source: 'schools',
      paint: {
        'circle-radius': {
          base: 1.5,
          stops: [
            [12, 1.5],
            [21, 10],
          ],
        },
        'circle-color': [
          'match',
          ['get', 'connectivity_status'],
          'no',
          connectivityStatusPaintData.no,
          'unknown',
          connectivityStatusPaintData.unknown,
          'moderate',
          connectivityStatusPaintData.moderate,
          'good',
          connectivityStatusPaintData.good,
          connectivityStatusPaintData.unknown,
        ],
      },
    });

    map?.on('mouseenter', 'schools', () => {
      // eslint-disable-next-line no-param-reassign
      map.getCanvas().style.cursor = 'pointer';
    });

    map?.on('mouseleave', 'schools', () => {
      // eslint-disable-next-line no-param-reassign
      map.getCanvas().style.cursor = '';
    });

    map?.on('click', 'schools', (event: MapMouseEvent) => {
      const features = map?.queryRenderedFeatures(event.point);
      const coordinates = (features[0].geometry as Point).coordinates.slice();
      const description = ((features[0].properties &&
        features[0]?.properties.name) ??
        'no data') as string;

      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxGL.Popup()
        .setLngLat([coordinates[0], coordinates[1]])
        .setHTML(`<span style="color: #000000;">${description}</span>`)
        .addTo(map);
    });
  }
});

$mapScope.watch(onLeaveMapCountry, ({ map, style }) => {
  map?.flyTo({
    center: defaultCenter,
    zoom: defaultZoom,
  });
  const paintData = countriesPaintData[style];
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
