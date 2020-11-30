import { createEffect } from 'effector';

import { JoinUsFormFields } from '@/project/types';

export const sendJoinUsFormFx = createEffect(
  async ({
    fullName,
    organization,
    purpose,
    yourMessage,
  }: JoinUsFormFields) => {
    // TODO
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ fullName, organization, purpose, yourMessage });
      }, 1500);
    });
  }
);
