import React from 'react';

export const DailySpeedGraph = () => (
  <div className="sidebar__content">
    <h3 className="sidebar__secondary-title">Daily speed graph (download)</h3>
    <div className="week-graph">
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
  </div>
);
