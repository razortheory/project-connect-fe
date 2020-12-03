import { combine, guard, merge, sample } from 'effector';

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
  onJoinUsFormSubmit,
  onOrganizationChange,
  onPurposeChange,
  onYourMessageChange,
  toggleMenu,
} from '@/project/model';
import { onAboutRef, onPrivacyRef } from '@/project/ui';
import { scrollToHashFx } from '@/scroll';

$isMenuOpen.on(toggleMenu, getInverted);

$fullName.on(onFullNameChange, (_, event) => getInputValue(event));
$organization.on(onOrganizationChange, (_, event) => getInputValue(event));
$purpose.on(onPurposeChange, (_, event) => getInputValue(event));
$yourMessage.on(onYourMessageChange, (_, event) => event.target.value);
$fullName.on(onFullNameChange, (_, event) => getInputValue(event));

$isSendButtonDisabled.on(sendJoinUsFormFx, () => true);
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

sample({
  source: $fullName,
  clock: merge([onFullNameChange, onJoinUsFormSubmit]),
  fn: (state) => getInverted(state.trim().length !== 0),
  target: $fullNameError,
});

sample({
  source: $organization,
  clock: merge([onOrganizationChange, onJoinUsFormSubmit]),
  fn: (state) => getInverted(state.trim().length !== 0),
  target: $organizationError,
});

sample({
  source: $purpose,
  clock: merge([onPurposeChange, onJoinUsFormSubmit]),
  fn: (state) => getInverted(state.trim().length !== 0),
  target: $purposeError,
});

sample({
  source: $yourMessage,
  clock: merge([onYourMessageChange, onJoinUsFormSubmit]),
  fn: (state) => getInverted(state.trim().length !== 0),
  target: $yourMessageError,
});

sample({
  source: combine([
    $fullNameError,
    $organizationError,
    $purposeError,
    $yourMessageError,
  ]),
  clock: onJoinUsFormSubmit,
  fn: (state) => {
    if (state.every((element) => !element)) {
      return sendJoinUsFormFx({
        fullName: $fullName.getState(),
        organization: $organization.getState(),
        purpose: $purpose.getState(),
        yourMessage: $yourMessage.getState(),
      });
    }
    return null;
  },
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
