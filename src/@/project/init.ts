import { combine, forward, guard, merge, sample } from 'effector';

import { sendJoinUsFormFx } from '~/api/project-connect';
import { router } from '~/core/routes';
import { getInverted, setPayload } from '~/lib/effector-kit';

import {
  $fullName,
  $fullNameError,
  $isMenuOpen,
  $isSendButtonDisabled,
  $isSendButtonPending,
  $organization,
  $organizationError,
  $purpose,
  $purposeError,
  $submitSuccess,
  $yourMessage,
  $yourMessageError,
  clearFormFields,
  onFullNameChange,
  onJoinUsFormSubmit,
  onOrganizationChange,
  onPurposeChange,
  onYourMessageChange,
  toggleMenu,
} from '@/project/model';
import { onAboutRef, onPrivacyRef } from '@/project/ui';
import { scrollToHashFx } from '@/scroll';

$isMenuOpen.on(toggleMenu, getInverted);

$fullName.on(onFullNameChange, setPayload);
$organization.on(onOrganizationChange, setPayload);
$purpose.on(onPurposeChange, setPayload);
$yourMessage.on(onYourMessageChange, setPayload);

$fullName.reset(clearFormFields);
$organization.reset(clearFormFields);
$purpose.reset(clearFormFields);
$yourMessage.reset(clearFormFields);

sendJoinUsFormFx.done.watch(() => {
  clearFormFields();
});

sample({
  source: sendJoinUsFormFx.done,
  fn: () => true,
  target: $submitSuccess,
});

sample({
  source: merge([
    onFullNameChange,
    onOrganizationChange,
    onPurposeChange,
    onYourMessageChange,
  ]),
  fn: () => false,
  target: $submitSuccess,
});

forward({
  from: combine([$fullName, $organization, $yourMessage, $purpose], (states) =>
    states.some((state) => !state)
  ),
  to: $isSendButtonDisabled,
});

forward({
  from: sendJoinUsFormFx.pending,
  to: $isSendButtonPending,
});

sample({
  source: $fullName,
  clock: merge([onFullNameChange, onJoinUsFormSubmit]),
  fn: (state) => state.trim().length === 0,
  target: $fullNameError,
});

sample({
  source: $organization,
  clock: merge([onOrganizationChange, onJoinUsFormSubmit]),
  fn: (state) => state.trim().length === 0,
  target: $organizationError,
});

sample({
  source: $purpose,
  clock: merge([onPurposeChange, onJoinUsFormSubmit]),
  fn: (state) => state.trim().length === 0,
  target: $purposeError,
});

sample({
  source: $yourMessage,
  clock: merge([onYourMessageChange, onJoinUsFormSubmit]),
  fn: (state) => state.trim().length === 0,
  target: $yourMessageError,
});

const $formError = combine(
  [$fullNameError, $organizationError, $purposeError, $yourMessageError],
  (states) => states.some(Boolean)
);

const $formValues = combine([$fullName, $organization, $purpose, $yourMessage]);

const onSubmitForm = sample({
  source: $formError,
  clock: onJoinUsFormSubmit,
});

sample({
  source: $formValues,
  clock: guard(onSubmitForm, { filter: getInverted }),
  fn: ([fullName, organization, purpose, yourMessage]) => ({
    fullName,
    organization,
    purpose,
    yourMessage,
  }),
  target: sendJoinUsFormFx,
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
