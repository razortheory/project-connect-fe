import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import { map, project, router } from '~/core/routes';
import { MapPage } from '~/features/map';
import {
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
} from '~/features/map/country/model';
import { fetchGlobalStatsDataFx } from '~/features/map/model';
import { ProjectPage } from '~/features/project';
import { useRoute } from '~/lib/router';

const NotFound = () => (
  <figure style={{ color: '#000' }}>404: Not Found</figure>
);

export const Root = () => {
  useEffect(() => {
    void fetchCountriesDataFx();
    void fetchCountriesGeometryDataFx();
    void fetchGlobalStatsDataFx();
  }, []);

  return (
    <>
      {useRoute(map) && <MapPage />}
      {useRoute(project) && <ProjectPage />}
      {useStore(router.noMatches) && <NotFound />}
    </>
  );
};
