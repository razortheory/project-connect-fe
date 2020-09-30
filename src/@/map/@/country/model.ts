import { createEvent, createStore } from 'effector';
import { FeatureCollection } from 'geojson';
import mapboxGL, { MapLayerMouseEvent } from 'mapbox-gl';

import { fetchSchoolFx } from '~/api/project-connect';
import { Country, CountryBasic, CountryGeometry, School } from '~/api/types';

export const changeCountryId = createEvent<number>();
export const changeSchoolId = createEvent<number>();
export const clickSchool = createEvent<MapLayerMouseEvent>();

export const $countryId = createStore(0);
export const $schoolId = createStore(0);
export const $countriesGeometry = createStore<CountryGeometry[] | null>(null);
export const $countries = createStore<CountryBasic[] | null>(null);
export const $countriesGeoJson = createStore<FeatureCollection | null>(null);
export const $schools = createStore<FeatureCollection | null>(null);
export const $country = createStore<Country | null>(null);
export const $popupContent = createStore<HTMLDivElement | null>(null);
export const $school = createStore<School | null>(null);
export const $schoolPending = fetchSchoolFx.pending;
export const $popup = createStore<mapboxGL.Popup>(
  new mapboxGL.Popup({
    maxWidth: '100%',
    className: 'school-popup',
    anchor: 'center',
  })
);
