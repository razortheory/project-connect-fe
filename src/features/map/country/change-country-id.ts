import { changeCountryIdFx, updateCountryFx, updateSchoolsFx } from './model';

changeCountryIdFx.use(async ({ map, paintData, countryId }) => {
  if (!countryId || !map) return;

  // Run in parallel
  await Promise.all([
    updateCountryFx({ map, paintData, countryId }),
    updateSchoolsFx({ map, countryId }),
  ]);
});
