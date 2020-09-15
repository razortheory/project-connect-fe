import { Point } from 'geojson';
import mapboxGL, { MapMouseEvent } from 'mapbox-gl';

import { fetchCountrySchools } from '~/features/map/api';
import { connectivityStatusPaintData } from '~/features/map/constants';

import { removeSchoolsFx, updateSchoolsFx } from './model';

updateSchoolsFx.use(async ({ map, countryId }) => {
  if (!countryId || !map) return;

  const [schools] = await Promise.all([
    fetchCountrySchools(countryId),
    removeSchoolsFx(map),
  ]);

  if (schools.features.length > 0) {
    map.addSource('schools', {
      type: 'geojson',
      data: schools,
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

    map.on('mouseenter', 'schools', () => {
      // eslint-disable-next-line no-param-reassign
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'schools', () => {
      // eslint-disable-next-line no-param-reassign
      map.getCanvas().style.cursor = '';
    });

    map.on('click', 'schools', (event: MapMouseEvent) => {
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
