/* eslint-disable @typescript-eslint/naming-convention */

import { useStore } from 'effector-react';
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { CountryWeeklyStats } from '~/api/types';
import { formatPercent } from '~/core/formatters';

import { $countryWeeklyStats } from '@/country/model';
import { connectivityStatusPaintData } from '@/map/constants';

const getPercentage = (value: number, total: number): number =>
  total && value / total;

const getSchoolsData = (countryWeeklyStats: CountryWeeklyStats) => {
  const {
    schools_connectivity_no,
    schools_connectivity_good,
    schools_connectivity_moderate,
    schools_connectivity_unknown,
    schools_total,
  } = countryWeeklyStats;

  return {
    percentConnectivityNo: getPercentage(
      schools_connectivity_no,
      schools_total
    ),
    percentConnectivityGood: getPercentage(
      schools_connectivity_good,
      schools_total
    ),
    percentConnectivityModerate: getPercentage(
      schools_connectivity_moderate,
      schools_total
    ),
    percentConnectivityUnknown: getPercentage(
      schools_connectivity_unknown,
      schools_total
    ),
  };
};

// Pie chart constants
//-----------------------------------------------------
const SVG_VIEW_BOX_WIDTH = 20;
const SVG_VIEW_BOX_HEIGHT = 20;
const CIRCLE_CENTER_X = 10;
const CIRCLE_CENTER_Y = 10;
const CIRCLE_RADIUS = 9;
const STROKE_WIDTH = 2;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const START_OFFSET_ANGLE = 180; // Chart start from left
//-----------------------------------------------------

const FULL_CIRCLE_ANGLE = 360;
const getOffsetAngle = (offsetPercent: number): number =>
  FULL_CIRCLE_ANGLE * offsetPercent + START_OFFSET_ANGLE;

const circleKeyframe = (length: number, fullLength: number) => keyframes`
  from {
    stroke-dasharray: ${`0, ${fullLength}`};
  }
  to {
    stroke-dasharray: ${`${length}, ${fullLength}`};
  }
`;

interface CircleProps {
  length: number;
  fullLength: number;
  angle: number;
}

const AnimatedCircle = styled.circle<CircleProps>`
  /* stylelint-disable scss/operator-no-unspaced, value-keyword-case, function-name-case */
  transform: ${({ angle }) => `rotate(${angle}deg) `};
  transform-origin: center;
  stroke-dasharray: ${({ length, fullLength }) => `${length}, ${fullLength}`};
  animation: ${({ length, fullLength }) => circleKeyframe(length, fullLength)}
    linear 0.5s;
`;

export const PieChart = () => {
  const countryWeeklyStats = useStore($countryWeeklyStats);

  if (!countryWeeklyStats) {
    return null;
  }

  const {
    percentConnectivityNo = 0,
    percentConnectivityGood = 0,
    percentConnectivityModerate = 0,
    percentConnectivityUnknown = 0,
  } = getSchoolsData(countryWeeklyStats);

  const noConnectivityOffsetAngle = getOffsetAngle(0);
  const goodConnectivityOffsetAngle = getOffsetAngle(percentConnectivityNo);
  const moderateConnectivityOffsetAngle = getOffsetAngle(
    percentConnectivityNo + percentConnectivityGood
  );
  const unknownConnectivityOffsetAngle = getOffsetAngle(
    percentConnectivityNo +
      percentConnectivityGood +
      percentConnectivityModerate
  );

  return (
    <div className="pie-chart">
      <div className="pie-chart__explanation">
        <div className="pie-chart__percent-value pie-chart__percent-value--no">
          {formatPercent(percentConnectivityNo)}
        </div>
        <div className="pie-chart__percent-value pie-chart__percent-value--good">
          {formatPercent(percentConnectivityGood)}
        </div>
        <div className="pie-chart__percent-value pie-chart__percent-value--moderate">
          {formatPercent(percentConnectivityModerate)}
        </div>
        <div className="pie-chart__percent-value pie-chart__percent-value--unknown">
          {formatPercent(percentConnectivityUnknown)}
        </div>
      </div>

      <div className="pie-chart__graph">
        <svg viewBox={`0 0 ${SVG_VIEW_BOX_WIDTH} ${SVG_VIEW_BOX_HEIGHT}`}>
          {/* No connectivity */}

          <AnimatedCircle
            angle={noConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentConnectivityNo}
            fullLength={CIRCUMFERENCE}
            stroke={connectivityStatusPaintData.no}
            fill="transparent"
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* /!* Good connectivity *!/ */}

          <AnimatedCircle
            angle={goodConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentConnectivityGood}
            fullLength={CIRCUMFERENCE}
            stroke={connectivityStatusPaintData.good}
            fill="transparent"
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* /!*  Moderate connectivity *!/ */}

          <AnimatedCircle
            angle={moderateConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentConnectivityModerate}
            fullLength={CIRCUMFERENCE}
            stroke={connectivityStatusPaintData.moderate}
            fill="transparent"
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* /!* Unknown connectivity *!/ */}

          <AnimatedCircle
            angle={unknownConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentConnectivityUnknown}
            fullLength={CIRCUMFERENCE}
            stroke={connectivityStatusPaintData.unknown}
            fill="transparent"
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />
        </svg>
      </div>
    </div>
  );
};
