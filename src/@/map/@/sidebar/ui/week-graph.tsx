import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import IconHistory from '~/assets/images/icon-history.svg';

import { DayGraphData, WeekGraphData } from './get-week-graph-data';

export interface WeekGraphProps {
  showButtons?: boolean;
  showHistory?: boolean;
  weekGraphData: WeekGraphData;
}

type WeekGraphDayProps = {
  dayGraphData: DayGraphData;
  title: string;
};

const WeekGraphDay = ({ dayGraphData, title }: WeekGraphDayProps) => (
  <div className="week-graph__item">
    <div className="week-graph__pillar">
      <div
        className="week-graph__filler"
        style={{
          height: dayGraphData?.speedPercent,
          backgroundColor: dayGraphData?.fillColor,
        }}
      />
    </div>
    <span className="week-graph__day">{title}</span>
  </div>
);

export const WeekGraph: React.FC<WeekGraphProps> = ({
  weekGraphData,
  showButtons,
  showHistory,
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
          <WeekGraphDay dayGraphData={weekGraphData?.monday} title="M" />
          <WeekGraphDay dayGraphData={weekGraphData?.tuesday} title="Tu" />
          <WeekGraphDay dayGraphData={weekGraphData?.wednesday} title="W" />
          <WeekGraphDay dayGraphData={weekGraphData?.thursday} title="Th" />
          <WeekGraphDay dayGraphData={weekGraphData?.friday} title="F" />
          <WeekGraphDay dayGraphData={weekGraphData?.saturday} title="Sa" />
          <WeekGraphDay dayGraphData={weekGraphData?.sunday} title="Su" />
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
        <button type="button" className="week-graph-link link">
          <IconHistory className="link__icon" />
          View history
        </button>
      )}
    </>
  );
};
