import './init';

import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import {
  fetchCountriesFx,
  fetchCountriesGeometryFx,
  fetchGlobalStatsFx,
  fetchSchoolsGlobal,
} from '~/api/project-connect';
import { map, mapCountry, project, router } from '~/core/routes';
import { useRoute } from '~/lib/router';

import { changeCountryCode } from '@/country/model';
import { MapPage } from '@/map/ui';
import { changeSchoolId } from '@/popup/model';
import { ProjectPage } from '@/project/ui';

const NotFound = () => (
  <figure style={{ color: '#000' }}>404: Not Found</figure>
);

export const Root = () => {
  const { code = '', schoolId = '' } = useStore(mapCountry.params) ?? {};

  useEffect(() => {
    void fetchCountriesFx();
    void fetchCountriesGeometryFx();
    void fetchGlobalStatsFx();
    void fetchSchoolsGlobal();

    if (code) {
      changeCountryCode(code);
    }

    if (schoolId) {
      changeSchoolId(Number(schoolId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {useRoute(map) && <MapPage />}
      {useRoute(project) && <ProjectPage />}
      {useStore(router.noMatches) && <NotFound />}
    </>
  );
};
