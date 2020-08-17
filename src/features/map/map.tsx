import { FeatureCollection, Point } from 'geojson';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import * as React from 'react';
import { CSSProperties, useEffect, useRef } from 'react';
import { API_MAPBOX_ACCESS_TOKEN } from '~/env';
import fake from './fake.json';

mapboxgl.accessToken = API_MAPBOX_ACCESS_TOKEN;

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
  zoom: 2,
};

export const Map = (): JSX.Element => {
  const mapReference = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/ivanrt/ckdk80nes0wb01iqminlchno4',
      center: [initMapOptions.centerLng, initMapOptions.centerLat],
      zoom: initMapOptions.zoom,
      container: mapReference.current || '',
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
        const description =
          (features[0].properties && features[0]?.properties.quality) ||
          'no data';

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
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
