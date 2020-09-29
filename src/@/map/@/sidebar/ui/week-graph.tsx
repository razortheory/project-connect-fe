import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import IconHistory from '~/assets/images/icon-history.svg';

import { WeekGraphData } from './get-week-graph-data';

export interface WeekGraphProps {
  showButtons?: boolean;
  showHistory?: boolean;
  weekGraphData: WeekGraphData;
}

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
          <div className="week-graph__item">
            <div className="week-graph__pillar">
              <div
                className="week-graph__filler"
                style={{
                  height: weekGraphData?.monday?.speedPercent,
                  backgroundColor: weekGraphData?.monday?.fillColor,
                }}
              />
            </div>
            <span className="week-graph__day">M</span>
          </div>
          <div className="week-graph__item">
            <div className="week-graph__pillar">
              <div
                className="week-graph__filler"
                style={{
                  height: weekGraphData?.tuesday?.speedPercent,
                  backgroundColor: weekGraphData?.tuesday?.fillColor,
                }}
              />
            </div>
            <span className="week-graph__day">Tu</span>
          </div>
          <div className="week-graph__item">
            <div className="week-graph__pillar">
              <div
                className="week-graph__filler"
                style={{
                  height: weekGraphData?.wednesday?.speedPercent,
                  backgroundColor: weekGraphData?.wednesday?.fillColor,
                }}
              />
            </div>
            <span className="week-graph__day">W</span>
          </div>
          <div className="week-graph__item">
            <div className="week-graph__pillar">
              <div
                className="week-graph__filler"
                style={{
                  height: weekGraphData?.thursday?.speedPercent,
                  backgroundColor: weekGraphData?.thursday?.fillColor,
                }}
              />
            </div>
            <span className="week-graph__day">Th</span>
          </div>
          <div className="week-graph__item">
            <div className="week-graph__pillar">
              <div
                className="week-graph__filler"
                style={{
                  height: weekGraphData?.friday?.speedPercent,
                  backgroundColor: weekGraphData?.friday?.fillColor,
                }}
              />
            </div>
            <span className="week-graph__day">F</span>
          </div>
          <div className="week-graph__item">
            <div className="week-graph__pillar">
              <div
                className="week-graph__filler"
                style={{
                  height: weekGraphData?.saturday?.speedPercent,
                  backgroundColor: weekGraphData?.saturday?.fillColor,
                }}
              />
            </div>
            <span className="week-graph__day">Sa</span>
          </div>
          <div className="week-graph__item">
            <div className="week-graph__pillar">
              <div
                className="week-graph__filler"
                style={{
                  height: weekGraphData?.sunday?.speedPercent,
                  backgroundColor: weekGraphData?.sunday?.fillColor,
                }}
              />
            </div>
            <span className="week-graph__day">Su</span>
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
};
