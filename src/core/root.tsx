import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import { map, project, router } from '~/core/routes';
import {
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
} from '~/features/map/country/model';
import { useRoute } from '~/lib/router';
import { MapPage, ProjectPage } from '~/pages';

const NotFound = () => (
  <figure style={{ color: '#000' }}>404: Not Found</figure>
);

export const Root = () => {
  useEffect(() => {
    void fetchCountriesDataFx();
    void fetchCountriesGeometryDataFx();
  }, []);

  return (
    <>
      {useRoute(map) && <MapPage />}
      {useRoute(project) && <ProjectPage />}
      {useStore(router.noMatches) && <NotFound />}
    </>
  );
};
