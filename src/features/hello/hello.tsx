import React from 'react';
import styled from 'styled-components';

import wavingHandEmoji from './assets/emoji/1f44b.png';
import LogoSvg from './assets/logo.svg';

const Greeting = styled.span`
  padding: 2px;
  color: #639;
  font-size: 24px;
  border: 1px solid #639;
  border-radius: 5px;

  &:hover {
    border-color: #080;
  }
`;

const Logo = styled(LogoSvg)`
  width: 64px;
`;

export type Props = {
  greeting: string;
};

// Root child
export const Hello = ({ greeting }: Props) => (
  <>
    <img src={wavingHandEmoji as string} alt="Waving Hand Emoji" />
    <Greeting className="hello">{greeting}</Greeting>
    <Logo />
  </>
);
