import { useStore } from 'effector-react';
import React from 'react';

import { router } from '~/core/router';
import { map, project } from '~/core/routes';
import { useRoute } from '~/lib/router';
import { MapPage, ProjectPage } from '~/pages';

const NotFound = () => (
  <figure style={{ color: '#000' }}>404: Not Found</figure>
);

export const Root = () => (
  <>
    {useRoute(map) && <MapPage />}
    {useRoute(project) && <ProjectPage />}
    {useStore(router.noMatches) && <NotFound />}
  </>
);
