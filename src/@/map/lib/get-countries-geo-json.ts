import { FeatureCollection, Geometry } from 'geojson';

import { CountryGeometryData, CountryMetaData } from '~/api/types';

export const getCountriesGeoJson = (
  countriesProperties: CountryMetaData[] | null,
  countriesGeometry: CountryGeometryData[] | null
): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features:
      countriesProperties
        ?.filter((country) => country.integration_status !== 0)
        .map((country) => {
          const countryGeometryData = countriesGeometry?.find(
            (countryGeometry) => countryGeometry.id === country.id
          );
          return {
            type: 'Feature',
            properties: {
              integration_status: country.integration_status,
              schools_with_data_percentage:
                country.schools_with_data_percentage,
              code: country.code,
            },
            geometry: countryGeometryData?.geometry_simplified as Geometry,
            id: country.id,
          };
        }) ?? [],
  };
};
