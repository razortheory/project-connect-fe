import React from 'react';

type Props = {
  to: string;
};

export const Button = ({ to }: Props) => (
  <a href={to} className="button button--primary">
    Project info
  </a>
);
