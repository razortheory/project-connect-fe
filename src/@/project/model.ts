import { createEvent, createStore } from 'effector';

export const toggleMenu = createEvent();
export const onFullNameChange = createEvent<string>();
export const onOrganizationChange = createEvent<string>();
export const onPurposeChange = createEvent<string>();
export const onYourMessageChange = createEvent<string>();

export const clearFormFields = createEvent();
export const onJoinUsFormRequest = createEvent();
export const onJoinUsFormSubmit = createEvent();

export const $isMenuOpen = createStore(false);
export const $fullName = createStore<string>('');
export const $organization = createStore<string>('');
export const $purpose = createStore<string>('');
export const $yourMessage = createStore<string>('');
export const $fullNameError = createStore<boolean>(false);
export const $organizationError = createStore<boolean>(false);
export const $purposeError = createStore<boolean>(false);
export const $yourMessageError = createStore<boolean>(false);
export const $isSendButtonDisabled = createStore<boolean>(true);
export const $isSendButtonPending = createStore<boolean>(false);
export const $submitSuccess = createStore<boolean>(false);
