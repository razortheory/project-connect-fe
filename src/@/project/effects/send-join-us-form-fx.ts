import { createRequest } from '~/lib/request';
import { createRequestFx } from '~/lib/request-fx';

import { JoinUsFormFields } from '@/project/types';

const apiBaseUrl = 'https://api.projectconnect.razortheory.com/';

const request = createRequest({
  baseUrl: apiBaseUrl,
});

export const sendJoinUsFormFx = createRequestFx(
  async (formFields: JoinUsFormFields) => {
    const { fullName, organization, purpose, yourMessage } = formFields;
    const result = {
      full_name: fullName,
      organisation: organization,
      purpose,
      message: yourMessage,
    };
    return request({
      url: `api/contact/contact`,
      method: 'POST',
      data: JSON.stringify(result),
    });
  }
);
