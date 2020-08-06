import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize};

  html {
    /* Reset box sizing to border-box */
    box-sizing: border-box;
    font-size: 16px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
  }

  /* Make it easier to change the box-sizing later */
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /* Inherit link color */
  a {
    color: inherit;
    text-decoration: none;
  }
`;
