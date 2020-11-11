import React from 'react';
import styled, { keyframes } from 'styled-components';

const HorizontalLine = styled.div<{ wide: boolean }>`
  /* stylelint-disable scss/operator-no-unspaced */
  position: relative;
  display: flex;
  align-items: flex-end;
  height: ${({ wide }) => (wide ? '5px' : '1px')};
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const progressLoop = keyframes`
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(200%);
  }
`;

const Fill = styled.div`
  width: 50%;
  background-color: #2779ff;
  animation: ${progressLoop} 1.7s linear infinite, ${fadeIn} 0.2s ease-in;
`;

const Track = styled.div<{ wide: boolean }>`
  z-index: 1;
  display: flex;
  flex-grow: 1;
  height: ${({ wide }) => (wide ? '5px' : '1px')};
  overflow: hidden;
`;

const Progress = ({ wide }: { wide: boolean }) => (
  <Track wide={wide}>
    <Fill />
  </Track>
);

type ProgressBarProps = { pending?: boolean; wide?: boolean };

export const ProgressBar = ({
  pending = true,
  wide = false,
}: ProgressBarProps) => (
  <HorizontalLine wide={wide}>
    {pending && <Progress wide={wide} />}
  </HorizontalLine>
);
