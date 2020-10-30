import './init';

import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchGlobalStatsFx,
  fetchSchoolsGlobal,
} from '~/api/project-connect';
import { map, project, router } from '~/core/routes';
import { useRoute } from '~/lib/router';

import { MapPage } from '@/map/ui';
import { ProjectPage } from '@/project/ui';

const NotFound = () => (
  <figure style={{ color: '#000' }}>404: Not Found</figure>
);

export const Root = () => {
  useEffect(() => {
    void fetchCountriesFx();
    void fetchCountriesGeometryFx();
    void fetchGlobalStatsFx();
    void fetchSchoolsGlobal();
  }, []);

  return (
    <>
      {useRoute(map) && <MapPage />}
      {useRoute(project) && <ProjectPage />}
      {useStore(router.noMatches) && <NotFound />}
    </>
  );
};
