import { combine, guard, sample } from 'effector';

import { sendJoinUsFormFx } from '~/api/project-connect';
import { router } from '~/core/routes';
import { getInverted } from '~/lib/effector-kit';
import { getInputValue } from '~/lib/event-reducers';

import {
  $fullName,
  $fullNameError,
  $isMenuOpen,
  $isSendButtonDisabled,
  $organization,
  $organizationError,
  $purpose,
  $purposeError,
  $yourMessage,
  $yourMessageError,
  clearFormFields,
  onFullNameChange,
  onJoinUsFormRequest,
  onJoinUsFormSubmit,
  onOrganizationChange,
  onPurposeChange,
  onYourMessageChange,
  toggleMenu,
} from '@/project/model';
import { JoinUsFormFields } from '@/project/types';
import { onAboutRef, onPrivacyRef } from '@/project/ui';
import { scrollToHashFx } from '@/scroll';

$isMenuOpen.on(toggleMenu, getInverted);

$fullName.on(onFullNameChange, (_, event) => getInputValue(event));
$organization.on(onOrganizationChange, (_, event) => getInputValue(event));
$purpose.on(onPurposeChange, (_, event) => getInputValue(event));
$yourMessage.on(onYourMessageChange, (_, event) => event.target.value);
$fullName.on(onFullNameChange, (_, event) => getInputValue(event));

$isSendButtonDisabled.on(onJoinUsFormRequest, () => true);
$isSendButtonDisabled.reset(sendJoinUsFormFx.done, sendJoinUsFormFx.fail);
$fullName.reset(clearFormFields);
$organization.reset(clearFormFields);
$purpose.reset(clearFormFields);
$yourMessage.reset(clearFormFields);

sendJoinUsFormFx.done.watch(() => {
  clearFormFields();
});
sendJoinUsFormFx.fail.watch(() => {
  clearFormFields();
});

const validateInput = (fieldValue: string, fieldName: string) => {
  if (fieldValue.trim().length === 0) {
    return `${fieldName} field is required`;
  }
  if (fieldValue.length > 50) {
    return `${fieldName} should not be more than 50 characters`;
  }
  return '';
};
const validateTextArea = (fieldValue: string, fieldName: string) => {
  if (fieldValue.trim().length === 0) {
    return `${fieldName} field is required`;
  }
  if (fieldValue.length > 250) {
    return `${fieldName} should not be more than 250 characters`;
  }
  return '';
};
const validateAllFields = (state: JoinUsFormFields) => {
  const fullNameError = validateInput(state.fullName, 'Full Name');
  const organizationError = validateInput(state.organization, 'Organization');
  const purposeError = validateInput(state.purpose, 'Purpose');
  const yourMessageError = validateInput(state.yourMessage, 'Your message');
  if (
    fullNameError === '' &&
    organizationError === '' &&
    purposeError === '' &&
    yourMessageError === ''
  ) {
    onJoinUsFormRequest();
  }
};

sample({
  source: {
    fullName: $fullName,
    organization: $organization,
    purpose: $purpose,
    yourMessage: $yourMessage,
  },
  clock: onJoinUsFormSubmit,
  fn: validateAllFields,
});

sample({
  source: {
    fullName: $fullName,
    organization: $organization,
    purpose: $purpose,
    yourMessage: $yourMessage,
  },
  clock: onJoinUsFormRequest,
  fn: sendJoinUsFormFx,
});

sample({
  source: $fullName,
  clock: onJoinUsFormSubmit,
  fn: (state) => validateInput(state, 'Full Name'),
  target: $fullNameError,
});

sample({
  source: $organization,
  clock: onJoinUsFormSubmit,
  fn: (state) => validateInput(state, 'Organization'),
  target: $organizationError,
});

sample({
  source: $purpose,
  clock: onJoinUsFormSubmit,
  fn: (state) => validateInput(state, 'Purpose'),
  target: $purposeError,
});

sample({
  source: $yourMessage,
  clock: onJoinUsFormSubmit,
  fn: (state) => validateTextArea(state, 'Your message'),
  target: $yourMessageError,
});

sample({
  source: combine([router.pathname, router.hash]),
  fn: () => false,
  target: $isMenuOpen,
});

sample({
  source: router.hash,
  clock: guard(onAboutRef, { filter: Boolean }),
  target: scrollToHashFx,
});

sample({
  source: router.hash,
  clock: guard(onPrivacyRef, { filter: Boolean }),
  target: scrollToHashFx,
});
