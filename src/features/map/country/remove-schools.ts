import { removeSchoolsFx } from './model';

removeSchoolsFx.use((map) => {
  if (map.getLayer('schools')) {
    map.removeLayer('schools');
  }

  if (map.getSource('schools')) {
    map.removeSource('schools');
  }
});
