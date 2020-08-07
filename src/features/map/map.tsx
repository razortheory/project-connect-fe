import * as React from 'react';
import { CSSProperties } from 'react';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';

const MapBox = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiaXZhbnJ0IiwiYSI6ImNrZGlwN3B6ejA3M3QycnAzZHR4NWxnMXIifQ.wXvdCl_qPQ55hb8Bgkeb5A',
});

const mapStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  width: '100vw',
  height: '100vh',
};

const circleStyles = {
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
};

const fakeGeoJSON = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [27.465222, 53.877752],
        },
        properties: {
          quality: 'good',
          title: 'Mapbox DC',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [27.434055, 53.863588],
        },
        properties: {
          quality: 'bad',
          title: 'Mapbox DC',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [30.581234, 52.38837],
        },
        properties: {
          quality: 'bad',
          title: 'Mapbox DC',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [29.614766, 55.532017],
        },
        properties: {
          quality: 'good',
          title: 'Mapbox DC',
        },
      },
    ],
  },
};

export const Map = (): JSX.Element => {
  return (
    <MapBox
      center={[0, 40]}
      zoom={[2]}
      style="mapbox://styles/ivanrt/ckdk80nes0wb01iqminlchno4" // eslint-disable-line react/style-prop-object
      containerStyle={mapStyles}
    >
      {/* Example */}
      <Source id="example" geoJsonSource={fakeGeoJSON} />
      <Layer
        id="example"
        type="circle"
        sourceId="example"
        paint={circleStyles}
      />
    </MapBox>
  );
};
