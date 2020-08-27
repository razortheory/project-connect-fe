import { Feature, FeatureCollection, MultiPolygon } from 'geojson';
import mapboxGL, { MapLayerMouseEvent } from 'mapbox-gl';

import { setPayload } from '~/lib/effector-kit';
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
  $map,
  $style,
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
  const loaderMarker = new mapboxGL.Marker(loaderWrapper)
    .setLngLat(map.getCenter())
    .addTo(map);

  // always display the loader in the center
  map.on('zoom', () => {
    loaderMarker.setLngLat(map.getCenter());
  });

  map.on('move', () => {
    loaderMarker.setLngLat(map.getCenter());
  });

  // create request
  const request = createRequest({
    baseUrl: ' https://api.projectconnect.razortheory.com/',
  });

  map.on('load', async () => {
    // const points = await request({
    //   url: 'api/locations/countries/32/schools/',
    //   method: 'GET',
    //   fn: ({ jsonData }) =>
    //     convertSchoolsDataToGeoJson(jsonData as SchoolData[]),
    // });

    const countries = await request({
      url: 'api/locations/countries/',
      method: 'GET',
      fn: ({ jsonData }) =>
        convertCountriesDataToGeoJson(jsonData as CountryData[]),
    });
    let hoveredCountryId = 0;
    // remove loader after loading data
    loaderMarker.remove();

    map.addSource('countries', {
      type: 'geojson',
      data: countries as FeatureCollection,
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
      if (!event.features || !event.features[0]) {
        return;
      }

      const bounds = getPolygonBoundingBox(
        event.features[0] as Feature<MultiPolygon>
      );
      map.fitBounds(bounds, {
        padding: { left: 360, right: 30, top: 30, bottom: 30 },
      });
    });

    map.on('mouseenter', 'countries', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'countries', () => {
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

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on('mouseleave', 'state-fills', () => {
      if (hoveredCountryId) {
        map.setFeatureState(
          { source: 'states', id: hoveredCountryId },
          { hover: false }
        );
      }
      hoveredCountryId = 0;
    });

    // map.addSource('schools', {
    //   type: 'geojson',
    //   data: points as FeatureCollection,
    // });
    //
    // map.addLayer({
    //   id: 'schools',
    //   type: 'circle',
    //   source: 'schools',
    //   paint: {
    //     'circle-radius': {
    //       base: 0.75,
    //       stops: [
    //         [12, 2],
    //         [21, 180],
    //       ],
    //     },
    //     'circle-color': [
    //       'match',
    //       ['get', 'quality'],
    //       'good',
    //       '#fbb03b',
    //       'bad',
    //       '#3bb2d0',
    //       '#ccc',
    //     ],
    //   },
    // });

    // map.on('click', 'schools', (event: MapMouseEvent) => {
    //   const features = map.queryRenderedFeatures(event.point);
    //   const coordinates = (features[0].geometry as Point).coordinates.slice();
    //   const description = ((features[0].properties &&
    //     features[0]?.properties.name) ??
    //     'no data') as string;
    //
    //   while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    //   }
    //
    //   new mapboxGL.Popup()
    //     .setLngLat([coordinates[0], coordinates[1]])
    //     .setHTML(`<span style="color: #000000;">${description}</span>`)
    //     .addTo(map);
    // });
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
