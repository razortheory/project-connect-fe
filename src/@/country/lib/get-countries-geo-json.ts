import { FeatureCollection, Geometry } from 'geojson';

import { CountryBasic, CountryGeometry } from '~/api/types';

export const getCountriesGeoJson = (
  countriesProperties: CountryBasic[] | null,
  countriesGeometry: CountryGeometry[] | null
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features:
      countriesProperties
        ?.filter((country) => country.integration_status !== 0)
        .map((country) => {
          const countryGeometry = countriesGeometry?.find(
            (geometry) => geometry.id === country.id
          );
          return {
            type: 'Feature',
            properties: {
              integration_status: country.integration_status,
              code: country.code,
            },
            geometry: countryGeometry?.geometry_simplified as Geometry,
            id: country.id,
          };
        }) ?? [],
  };
};
