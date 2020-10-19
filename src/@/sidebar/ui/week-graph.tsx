import React from 'react';
import styled, { keyframes } from 'styled-components';

import Chevron from '~/assets/images/chevron.svg';
import IconHistory from '~/assets/images/icon-history.svg';

import { changeHistoryDataType } from '@/country/model';
import { StatsDataType } from '@/country/types';

import { WeekGraphData, WeekGraphItemData } from './get-week-graph-data';

interface WeekGraphProps {
  showButtons?: boolean;
  showHistory?: boolean;
  weekGraphData: WeekGraphData;
  dataType: StatsDataType;
}

type WeekGraphItemProps = {
  data?: WeekGraphItemData;
  title: string;
};

const fillerKeyframe = (height?: string) => keyframes`
  from {
    height: 0%;
  }
  to {
    height: ${height};
  }
`;

interface FillerProps {
  height?: string;
  background?: string;
}

export const Filler = styled.div<FillerProps>`
  /* stylelint-disable scss/operator-no-unspaced, function-name-case */
  position: relative;
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${({ background }) => background};
  cursor: pointer;
  animation: ${({ height }) => fillerKeyframe(height)} 0.5s linear;

  &:hover {
    .week-graph__tooltip {
      display: flex;
    }
  }
`;

// TODO: Fix argument types (WeekGraphItemProps mismatch)
const WeekGraphItem = ({ data, title }: WeekGraphItemProps) => (
  <div className="week-graph__item">
    <div className="week-graph__pillar">
      <Filler height={data?.speedPercent} background={data?.fillColor}>
        <div className="week-graph__tooltip">
          <span>{data?.speed}</span>
          <span>{data?.date}</span>
        </div>
      </Filler>
    </div>
    <span className="week-graph__day">{title}</span>
  </div>
);

export const WeekGraph = ({
  weekGraphData: {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  },
  showButtons,
  showHistory,
  dataType,
}: WeekGraphProps) => {
  return (
    <>
      <h3 className="sidebar__secondary-title">Daily speed graph (download)</h3>
      <div className="week-graph">
        {showButtons && (
          <button
            type="button"
            className="week-graph__button week-graph__button--prev"
          >
            <Chevron
              className="chevron chevron--left"
              alt="Go to previous week"
            />
          </button>
        )}
        <div className="week-graph__days-wrapper">
          <WeekGraphItem data={monday} title="M" />
          <WeekGraphItem data={tuesday} title="Tu" />
          <WeekGraphItem data={wednesday} title="W" />
          <WeekGraphItem data={thursday} title="Th" />
          <WeekGraphItem data={friday} title="F" />
          <WeekGraphItem data={saturday} title="Sa" />
          <WeekGraphItem data={sunday} title="Su" />
        </div>
        {showButtons && (
          <button
            type="button"
            className="week-graph__button week-graph__button--next"
          >
            <Chevron className="chevron" alt="Go to next week" />
          </button>
        )}
      </div>
      {showHistory && (
        <button
          onClick={() => changeHistoryDataType(dataType)}
          type="button"
          className="week-graph-link link"
        >
          <IconHistory className="link__icon" />
          View history
        </button>
      )}
    </>
  );
};
