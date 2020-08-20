import 'mapbox-gl/dist/mapbox-gl.css';

import React, { CSSProperties, useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { FeatureCollection, Point } from 'geojson';
import mapboxGL, { MapMouseEvent } from 'mapbox-gl';
import { $mapTheme, $mapZoom, MapTheme } from './model';

import { API_MAPBOX_ACCESS_TOKEN } from '~/env';

import fake from './fake-geo.json';


mapboxGL.accessToken = API_MAPBOX_ACCESS_TOKEN;

const mapStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 1,
};

const initMapOptions = {
  centerLng: 0,
  centerLat: 40,
};

const mapThemes: { [theme in MapTheme]: string } = {
  dark: 'mapbox://styles/ivanrt/ckdk80nes0wb01iqminlchno4',
  light: 'mapbox://styles/ivanrt/ckdzse0bp0r2419lbj96dw07a',
  satellite: 'mapbox://styles/ivanrt/cke2hmks20xc119mpssxyiytb',
  accessible: 'mapbox://styles/ivanrt/cke16a91g0lg41aoz5zk4ddr2',
};

export const Map = () => {
  const mapReference = useRef(null);
  const theme: MapTheme = useStore($mapTheme);
  const zoom: number = useStore($mapZoom);

  useEffect(() => {
    const map = new mapboxGL.Map({
      style: mapThemes[theme],
      center: [initMapOptions.centerLng, initMapOptions.centerLat],
      zoom,
      container: mapReference.current ?? '',
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
  });

  return <div id="map" ref={mapReference} style={mapStyles} />;
};
