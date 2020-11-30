import { createEvent, createStore } from 'effector';
import { ChangeEvent } from 'react';

export const toggleMenu = createEvent();
export const onFullNameChange = createEvent<ChangeEvent<HTMLInputElement>>();
export const onOrganizationChange = createEvent<
  ChangeEvent<HTMLInputElement>
>();
export const onPurposeChange = createEvent<ChangeEvent<HTMLInputElement>>();
export const onYourMessageChange = createEvent<
  ChangeEvent<HTMLTextAreaElement>
>();
export const setFullNameError = createEvent<string>();
export const setPurposeError = createEvent<string>();
export const setOrganizationError = createEvent<string>();
export const setYourMessageError = createEvent<string>();
export const clearFormFields = createEvent();
export const onJoinUsFormSubmit = createEvent();

export const $isMenuOpen = createStore(false);
export const $fullName = createStore<string>('');
export const $organization = createStore<string>('');
export const $purpose = createStore<string>('');
export const $yourMessage = createStore<string>('');
export const $fullNameError = createStore<string>('');
export const $organizationError = createStore<string>('');
export const $purposeError = createStore<string>('');
export const $yourMessageError = createStore<string>('');
export const $isSendButtonDisabled = createStore<boolean>(false);
