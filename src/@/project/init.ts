import { combine, guard, sample } from 'effector';

import { router } from '~/core/routes';
import { getInverted } from '~/lib/effector-kit';

import { sendJoinUsFormFx } from '@/project/effects';
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
  onJoinUsFormSubmit,
  onOrganizationChange,
  onPurposeChange,
  onYourMessageChange,
  setFullNameError,
  setOrganizationError,
  setPurposeError,
  setYourMessageError,
  toggleMenu,
} from '@/project/model';
import { onAboutRef, onPrivacyRef } from '@/project/ui';
import { scrollToHashFx } from '@/scroll';

$isMenuOpen.on(toggleMenu, getInverted);

$fullName.on(onFullNameChange, (_, event) => event.currentTarget.value);
$organization.on(onOrganizationChange, (_, event) => event.currentTarget.value);
$purpose.on(onPurposeChange, (_, event) => event.currentTarget.value);
$yourMessage.on(onYourMessageChange, (_, event) => event.currentTarget.value);
$fullName.on(onFullNameChange, (_, event) => event.currentTarget.value);
$fullNameError.on(setFullNameError, (state, payload) => payload);
$organizationError.on(setOrganizationError, (state, payload) => payload);
$purposeError.on(setPurposeError, (state, payload) => payload);
$yourMessageError.on(setYourMessageError, (state, payload) => payload);
$isSendButtonDisabled.on(onJoinUsFormSubmit, () => true);
$isSendButtonDisabled.reset(sendJoinUsFormFx.done);

$fullName.reset(clearFormFields);
$organization.reset(clearFormFields);
$purpose.reset(clearFormFields);
$yourMessage.reset(clearFormFields);

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
