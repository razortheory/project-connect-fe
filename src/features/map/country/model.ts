import { createEffect } from 'effector';

import { Map } from '~/features/map/types';

import { LeaveCountryRoute, UpdateCountry, UpdateSchools } from './types';

export const updateCountryFx = createEffect<UpdateCountry, void>();
export const updateSchoolsFx = createEffect<UpdateSchools, void>();
export const removeCountryFx = createEffect<Map, void>();
export const removeSchoolsFx = createEffect<Map, void>();
export const leaveCountryRouteFx = createEffect<LeaveCountryRoute, void>();
