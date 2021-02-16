// eslint-disable-next-line unicorn/filename-case
import { createRequestFx } from '~/lib/request-fx';

// eslint-disable-next-line import/named
import { ApiJoinUsFormFields, JoinUsFormFields } from '@/project/types';

const formFields = {
  full_name: 'Boris',
  organisation: 'OOO RT',
  purpose: 'Test',
  message: 'Test',
};
export const sendJoinUsFormMockFx = createRequestFx(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (params: JoinUsFormFields): Promise<ApiJoinUsFormFields | null> =>
    Promise.resolve(formFields)
);
