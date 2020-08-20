import React from 'react';

export type Props = {
  to: string;
  children: string;
};

export const Button = ({ to, children }: Props) => (
  <a href={to} className="header__button button button--primary">
    {children}
  </a>
);
