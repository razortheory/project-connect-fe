import { createEffect } from 'effector';

import { JoinUsFormFields } from '@/project/types';

export const sendJoinUsFormFx = createEffect(
  async (formFields: JoinUsFormFields | null) => {
    // TODO
    return new Promise((resolve, reject) => {
      if (formFields !== null) {
        setTimeout(() => {
          resolve(formFields);
        }, 1500);
      } else {
        reject(new Error('Some error'));
      }
    });
  }
);
