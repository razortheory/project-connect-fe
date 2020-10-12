import React from 'react';
import styled, { keyframes } from 'styled-components';

const HorizontalLine = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 1px;
  /* stylelint-disable-next-line */
  background-color: ${(props: { background: string }) => props.background};
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ProgressBarTrack = styled.div`
  z-index: 1;
  display: flex;
  flex-grow: 1;
  height: 1px;
  overflow: hidden;
`;

const progressLoop = keyframes`
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(200%);
  }
`;

const ProgressBarFill = styled.div`
  width: 50%;
  background-color: #529ae9;
  animation: ${progressLoop} 1.7s linear infinite, ${fadeIn} 0.2s ease-in;
`;

export const ProgressBar = () => (
  <ProgressBarTrack>
    <ProgressBarFill />
  </ProgressBarTrack>
);

type ProgressLineProps = { visible?: boolean; background?: string };

export const ProgressLine = ({
  visible = true,
  background = '#335a85',
}: ProgressLineProps) => (
  <HorizontalLine background={background}>
    {visible && <ProgressBar />}
  </HorizontalLine>
);
