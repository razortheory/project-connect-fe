import { Feature, FeatureCollection, MultiPolygon, Point } from 'geojson';
import mapboxGL, { MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';

import { setPayload, VoidFn } from '~/lib/effector-kit';
import { createRequest } from '~/packages/request';

import { defaultCenter, defaultZoom, styleUrls } from './constants';
import {
  convertCountriesDataToGeoJson,
  convertSchoolsDataToGeoJson,
  CountryData,
  getPolygonBoundingBox,
  SchoolData,
} from './map-data-helpers';
import {
  $countries,
  $map,
  $selectedCountryId,
  $style,
  changeMap,
  changeStyle,
  fetchCountriesFx,
  initMap,
  selectCountry,
  setCenter,
  zoomIn,
  zoomOut,
} from './model';
import { InitMapOptions } from './types';

// create request
const request = createRequest({
  baseUrl: ' https://api.projectconnect.razortheory.com/',
});

const fetchCountries: VoidFn = async () =>
  request({
    url: 'api/locations/countries/',
    method: 'GET',
    fn: ({ jsonData }) =>
      convertCountriesDataToGeoJson(jsonData as CountryData[]),
  });

fetchCountriesFx.use(fetchCountries as VoidFn<FeatureCollection>);

$map.on(changeMap, setPayload);
$style.on(changeStyle, setPayload);
$countries.on(fetchCountriesFx.doneData, setPayload);
$selectedCountryId.on(selectCountry, setPayload);

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
    void fetchCountriesFx();
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

$map.watch(fetchCountriesFx.doneData, (map, countries: FeatureCollection) => {
  if (!map) return;
  let hoveredCountryId = 0;
  let selectedCountryId = 0;

  // remove loader after loading data
  if (loaderMarker) {
    loaderMarker.remove();
  }

  map.addSource('countries', {
    type: 'geojson',
    data: countries,
  });

  map.addLayer({
    id: 'countries',
    type: 'fill',
    source: 'countries',
    paint: {
      'fill-color': '#0068ea',
      'fill-outline-color': '#646973',
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        0.9,
        1,
      ],
    },
  });

  map.on('click', 'countries', (event: MapLayerMouseEvent) => {
    if (
      !event.features ||
      !event.features[0] ||
      selectedCountryId === event.features[0].id
    ) {
      return;
    }
    if (map.getLayer('schools')) {
      map.removeLayer('schools');
    }
    if (map.getSource('schools')) {
      map.removeSource('schools');
    }

    if (selectedCountryId) {
      map.setFeatureState(
        { source: 'countries', id: selectedCountryId },
        { selected: false }
      );
    }
    selectedCountryId = event.features[0].id as number;
    selectCountry(selectedCountryId);

    map.setFeatureState(
      { source: 'countries', id: selectedCountryId },
      { selected: true }
    );

    map.setPaintProperty('countries', 'fill-color', [
      'case',
      ['boolean', ['feature-state', 'selected'], false],
      '#141923',
      '#373c46',
    ]);

    const bounds = getPolygonBoundingBox(
      event.features[0] as Feature<MultiPolygon>
    );
    map.fitBounds(bounds, {
      padding: { left: 360, right: 30, top: 30, bottom: 30 },
    });
  });

  map.on('mouseenter', 'countries', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'countries', () => {
    // eslint-disable-next-line no-param-reassign
    map.getCanvas().style.cursor = '';
  });

  map.on('mousemove', 'countries', (event: MapLayerMouseEvent) => {
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
  map.on('mouseleave', 'countries', () => {
    if (hoveredCountryId) {
      map.setFeatureState(
        { source: 'countries', id: hoveredCountryId },
        { hover: false }
      );
    }
    hoveredCountryId = 0;
  });
});

$map.watch(selectCountry, async (map, selectedCountryId) => {
  if (!map) return;
  const points = await request({
    url: `api/locations/countries/${selectedCountryId}/schools/`,
    method: 'GET',
    fn: ({ jsonData }) => convertSchoolsDataToGeoJson(jsonData as SchoolData[]),
  });
  if ((points as FeatureCollection).features.length > 0) {
    map.addSource('schools', {
      type: 'geojson',
      data: points as FeatureCollection,
    });

    map.addLayer({
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

    map.on('mouseenter', 'schools', () => {
      // eslint-disable-next-line no-param-reassign
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'schools', () => {
      // eslint-disable-next-line no-param-reassign
      map.getCanvas().style.cursor = '';
    });

    map.on('click', 'schools', (event: MapMouseEvent) => {
      const features = map.queryRenderedFeatures(event.point);
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
