import React, { MouseEvent } from 'react';

export type Props = {
  children: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => unknown;
};

export const Button = ({ children, onClick }: Props) => (
  <button
    type="button"
    className="header__button button button--primary"
    onClick={onClick}
  >
    {children}
  </button>
);
