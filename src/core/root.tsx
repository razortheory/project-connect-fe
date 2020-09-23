import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import {
  fetchCountriesDataFx,
  fetchCountriesGeometryDataFx,
  fetchGlobalStatsDataFx,
} from '~/api/project-connect';
import { map, project, router } from '~/core/routes';
import { useRoute } from '~/lib/router';

import { MapPage } from '@/map';
import { ProjectPage } from '@/project';

router.hash.watch(router.navigate, (hash) => {
  if (!hash) {
    window.scrollTo(0, 0);
  }
});

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
