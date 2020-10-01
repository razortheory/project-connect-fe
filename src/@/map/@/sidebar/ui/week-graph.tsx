import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import IconHistory from '~/assets/images/icon-history.svg';

import { WeekGraphData, WeekGraphItemData } from './get-week-graph-data';

export interface WeekGraphProps {
  showButtons?: boolean;
  showHistory?: boolean;
  weekGraphData: WeekGraphData;
}

type WeekGraphItemProps = {
  data?: WeekGraphItemData;
  title: string;
};

// TODO: Fix argument types (WeekGraphItemProps mismatch)
const WeekGraphItem = ({ data, title }: WeekGraphItemProps) => (
  <div className="week-graph__item">
    <div className="week-graph__pillar">
      <div
        className="week-graph__filler"
        style={{
          height: data?.speedPercent.toString(),
          backgroundColor: data?.fillColor.toString(),
        }}
      >
        <div className="week-graph__tooltip">
          <span>{data?.speed}</span>
          <span>{data?.date}</span>
        </div>
      </div>
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
}: WeekGraphProps) => (
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
      <button type="button" className="week-graph-link link">
        <IconHistory className="link__icon" />
        View history
      </button>
    )}
  </>
);
