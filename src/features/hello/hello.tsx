import React from 'react';
import styled from 'styled-components';
import wavingHandEmoji from '~/assets/emoji/1f44b.png';

const Greeting = styled.span`
  padding: 2px;
  color: rebeccapurple;
  font-size: 24px;
  border: 1px solid rebeccapurple;
  border-radius: 5px;

  &:hover {
    border-color: green;
  }
`;

export type Props = {
  greeting: string;
};

export const View = ({ greeting }: Props) => (
  <>
    <img src={wavingHandEmoji} alt="Waving Hand Emoji" />
    <Greeting className="hello">{greeting}</Greeting>
  </>
);

// Root child
export const Hello = View;
