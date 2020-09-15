import { removeCountryFx } from './model';

removeCountryFx.use((map) => {
  if (map.getLayer('selectedCountry')) {
    map.removeLayer('selectedCountry');
  }

  if (map.getSource('selectedCountry')) {
    map.removeSource('selectedCountry');
  }
});
