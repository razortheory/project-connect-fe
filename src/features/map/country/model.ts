import { createEffect } from 'effector';

import { ChangeCountry, UpdateCountry, UpdateSchools } from './types';

export const changeCountryIdFx = createEffect<ChangeCountry, void>();
export const updateCountryFx = createEffect<UpdateCountry, void>();
export const updateSchoolsFx = createEffect<UpdateSchools, void>();
