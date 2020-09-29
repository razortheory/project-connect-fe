import { createEvent, createStore, Store } from 'effector';

export const createMediaMatcher = (query: string): Store<boolean> => {
  const change = createEvent<MediaQueryListEvent>();
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener('change', change);
  const isMatched = createStore(mediaQueryList.matches);
  isMatched.on(change, (state, event) => event.matches);
  return isMatched;
};
