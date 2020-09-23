export const scrollToAnchor = (anchor: string): void => {
  const element = anchor
    ? document.querySelector(anchor)
    : document.querySelector('html');

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }
};
