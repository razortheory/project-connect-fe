import React from 'react';
import styled, { keyframes } from 'styled-components';

const HorizontalLine = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 1px;
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
  background-color: #529ae9;
  animation: ${progressLoop} 1.7s linear infinite, ${fadeIn} 0.2s ease-in;
`;

const Track = styled.div`
  z-index: 1;
  display: flex;
  flex-grow: 1;
  height: 1px;
  overflow: hidden;
`;

const Progress = () => (
  <Track>
    <Fill />
  </Track>
);

type ProgressBarProps = { pending?: boolean };

export const ProgressBar = ({ pending = true }: ProgressBarProps) => (
  <HorizontalLine>{pending && <Progress />}</HorizontalLine>
);
