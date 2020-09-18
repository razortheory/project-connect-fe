import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import IconHistory from '~/assets/images/icon-history.svg';

export interface DailySpeedGraphProps {
  showButtons?: boolean;
  showHistory?: boolean;
}

export const DailySpeedGraph: React.FC<DailySpeedGraphProps> = ({
  showButtons,
  showHistory,
}: DailySpeedGraphProps) => (
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
        <div className="week-graph__item">
          <div className="week-graph__pillar">
            <div className="week-graph__filler week-graph__filler--good" />
          </div>
          <span className="week-graph__day">F</span>
        </div>
        <div className="week-graph__item">
          <div className="week-graph__pillar">
            <div className="week-graph__filler week-graph__filler--bad" />
          </div>
          <span className="week-graph__day">Sa</span>
        </div>
        <div className="week-graph__item">
          <div className="week-graph__pillar">
            <div className="week-graph__filler week-graph__filler--middle" />
          </div>
          <span className="week-graph__day">Su</span>
        </div>
        <div className="week-graph__item">
          <div className="week-graph__pillar">
            <div className="week-graph__filler week-graph__filler--middle" />
          </div>
          <span className="week-graph__day">M</span>
        </div>
        <div className="week-graph__item">
          <div className="week-graph__pillar">
            <div className="week-graph__filler week-graph__filler--good" />
          </div>
          <span className="week-graph__day">Tu</span>
        </div>
        <div className="week-graph__item">
          <div className="week-graph__pillar">
            <div className="week-graph__filler week-graph__filler--bad" />
          </div>
          <span className="week-graph__day">W</span>
        </div>
        <div className="week-graph__item">
          <div className="week-graph__pillar">
            <div className="week-graph__filler week-graph__filler--middle" />
          </div>
          <span className="week-graph__day">Th</span>
        </div>
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
