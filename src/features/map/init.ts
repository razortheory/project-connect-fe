import { guard, sample } from 'effector';
import {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
import mapboxGL, { MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';

import { mapCountry } from '~/core/routes';
import { setPayload } from '~/lib/effector-kit';
import { createRequest } from '~/lib/request';

import { defaultCenter, defaultZoom, styleUrls } from './constants';
import {
  convertCountriesDataToGeoJson,
  convertSchoolsDataToGeoJson,
  getPolygonBoundingBox,
} from './map-data-helpers';
import {
  $countriesData,
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
} from './types';

// create request
const request = createRequest({
  baseUrl: 'https://api.projectconnect.razortheory.com/',
});

const fetchCountriesData = async () =>
  request<CountryData[]>('api/locations/countries/');

const fetchCountriesGeometryData = async () =>
  request<FeatureCollection>({
    url: 'api/locations/countries-boundary/',
    fn: ({ jsonData }) =>
      convertCountriesDataToGeoJson(jsonData as CountryGeometryData[]),
  });

fetchCountriesDataFx.use(fetchCountriesData);
fetchCountriesGeometryDataFx.use(fetchCountriesGeometryData);

$map.on(changeMap, setPayload);
$style.on(changeStyle, setPayload);
$countriesData.on(fetchCountriesDataFx.doneData, setPayload);
$countriesGeometryData.on(fetchCountriesGeometryDataFx.doneData, setPayload);

const onLeaveMapCountry = guard(mapCountry.visible, {
  filter: (visible) => !visible,
});

const countryIdChanged = sample({
  source: [$selectedCountryId, $countriesGeometryData],
  clock: changeCountryId,
  fn: ([currentCountryId, countriesGeometryData], newCountryId) => ({
    currentCountryId,
    newCountryId,
    countriesGeometryData,
  }),
});

$selectedCountryId.on(countryIdChanged, (_, { newCountryId }) => newCountryId);

sample({
  source: guard(mapCountry.params, { filter: Boolean }),
  fn: (params) => Number(params?.id),
  target: changeCountryId,
});

sample({
  source: mapCountry.params,
  clock: fetchCountriesGeometryDataFx.doneData,
  fn: (params) => (params?.id ? Number(params.id) : 0),
  target: changeCountryId,
});

let loaderMarker: mapboxGL.Marker | undefined;

initMap.watch(({ style, container, center, zoom }: InitMapOptions) => {
  const map = new mapboxGL.Map({
    style: styleUrls[style],
    center: center ?? defaultCenter,
    zoom: zoom ?? defaultZoom,
    container,
  });

  // create loader
  // a loader with animation that is not wrapped in a container is displayed incorrectly
  const loader = document.createElement('div');
  loader.className = 'map-loader';
  const loaderWrapper = document.createElement('div');
  loaderWrapper.append(loader);

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

  map.on('load', () => {
    void fetchCountriesDataFx();
    void fetchCountriesGeometryDataFx();
  });

  changeMap(map);
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

$map.watch(
  fetchCountriesGeometryDataFx.doneData,
  (map, countries: FeatureCollection) => {
    let hoveredCountryId = 0;

    // remove loader after loading data
    if (loaderMarker) {
      loaderMarker.remove();
    }

    map?.addSource('countries', {
      type: 'geojson',
      data: countries,
    });

    map?.addLayer({
      id: 'countries',
      type: 'fill',
      source: 'countries',
      paint: {
        'fill-color': [
          'match',
          ['get', 'connectivity'],
          'connectivity',
          '#0068ea',
          '#373c46',
        ],
        'fill-outline-color': '#646973',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.9,
          1,
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
  }
);

$map.watch(
  countryIdChanged,
  async (map, { currentCountryId, newCountryId, countriesGeometryData }) => {
    if (map?.getLayer('schools')) {
      map.removeLayer('schools');
    }
    if (map?.getSource('schools')) {
      map.removeSource('schools');
    }

    if (currentCountryId) {
      map?.setFeatureState(
        { source: 'countries', id: currentCountryId },
        { selected: false }
      );
    }

    if (newCountryId === 0) {
      map?.setPaintProperty('countries', 'fill-color', [
        'match',
        ['get', 'connectivity'],
        'connectivity',
        '#0068ea',
        '#373c46',
      ]);
      return;
    }

    map?.setFeatureState(
      { source: 'countries', id: newCountryId },
      { selected: true }
    );

    map?.setPaintProperty('countries', 'fill-color', [
      'case',
      ['boolean', ['feature-state', 'selected'], false],
      '#141923',
      '#373c46',
    ]);
    const selectedCountryGeometry = countriesGeometryData?.features?.find(
      (country: Feature) => country.id === newCountryId
    );

    const bounds = getPolygonBoundingBox(
      selectedCountryGeometry as Feature<MultiPolygon | Polygon>
    );

    map?.fitBounds(bounds, {
      padding: { left: 360, right: 30, top: 30, bottom: 30 },
    });

    const points = await request<FeatureCollection>({
      url: `api/locations/countries/${newCountryId}/schools/`,
      fn: ({ jsonData }) =>
        convertSchoolsDataToGeoJson(jsonData as SchoolData[]),
    });

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
          'circle-color': '#ffffff',
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
          .setHTML(`<div>${description}</div>`)
          .addTo(map);
      });
    }
  }
);

$map.watch(onLeaveMapCountry, (map) => {
  map?.flyTo({
    center: defaultCenter,
    zoom: defaultZoom,
  });
  map?.setPaintProperty('countries', 'fill-color', [
    'match',
    ['get', 'connectivity'],
    'connectivity',
    '#0068ea',
    '#373c46',
  ]);
  if (map?.getLayer('schools')) {
    map.removeLayer('schools');
  }
  if (map?.getSource('schools')) {
    map.removeSource('schools');
  }
});
