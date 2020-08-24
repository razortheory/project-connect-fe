import { FeatureCollection, Point } from 'geojson';
import mapboxGL, { MapMouseEvent } from 'mapbox-gl';

import { setPayload } from '~/lib/effector-kit';

import { defaultCenter, defaultZoom, styleUrls } from './constants';
import fake from './fake-geo.json';
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

  map.on('load', () => {
    map.addSource('example', {
      type: 'geojson',
      data: fake.data as FeatureCollection,
    });

    map.addLayer({
      id: 'example',
      type: 'circle',
      source: 'example',
      paint: {
        'circle-radius': {
          base: 1.75,
          stops: [
            [10, 2],
            [21, 180],
          ],
        },
        'circle-color': [
          'match',
          ['get', 'quality'],
          'good',
          '#fbb03b',
          'bad',
          '#3bb2d0',
          '#ccc',
        ],
      },
    });

    map.on('click', 'example', (event: MapMouseEvent) => {
      const features = map.queryRenderedFeatures(event.point);
      const coordinates = (features[0].geometry as Point).coordinates.slice();
      const description = ((features[0].properties &&
        features[0]?.properties.quality) ??
        'no data') as string;

      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxGL.Popup()
        .setLngLat([coordinates[0], coordinates[1]])
        .setHTML(description)
        .addTo(map);
    });

    map.on('mouseenter', 'example', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'example', () => {
      map.getCanvas().style.cursor = '';
    });
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
