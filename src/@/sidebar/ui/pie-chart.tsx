/* eslint-disable @typescript-eslint/naming-convention */

import { useStore } from 'effector-react';
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { CountryWeeklyStats } from '~/api/types';
import { formatPercent } from '~/core/formatters';

import { $countryWeeklyStats } from '@/country/model';
import { $mapType, $stylePaintData } from '@/map/model';
import { MapType } from '@/map/types';

const getPercentage = (value: number, total: number): number =>
  total && value / total;

const getSchoolsData = (
  countryWeeklyStats: CountryWeeklyStats,
  mapType: MapType
) => {
  const {
    schools_connectivity_no,
    schools_connectivity_good,
    schools_connectivity_moderate,
    schools_connectivity_unknown,
    schools_coverage_unknown,
    schools_coverage_no,
    schools_coverage_moderate,
    schools_coverage_good,
    schools_total,
  } = countryWeeklyStats;

  const isConnectivity = mapType === 'connectivity';

  return {
    percentNo: getPercentage(
      isConnectivity ? schools_connectivity_no : schools_coverage_no,
      schools_total
    ),
    percentGood: getPercentage(
      isConnectivity ? schools_connectivity_good : schools_coverage_good,
      schools_total
    ),
    percentModerate: getPercentage(
      isConnectivity
        ? schools_connectivity_moderate
        : schools_coverage_moderate,
      schools_total
    ),
    percentUnknown: getPercentage(
      isConnectivity ? schools_connectivity_unknown : schools_coverage_unknown,
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
  const paintData = useStore($stylePaintData);
  const mapType = useStore($mapType);

  console.log(countryWeeklyStats);

  if (!countryWeeklyStats) {
    return null;
  }

  const {
    percentNo = 0,
    percentGood = 0,
    percentModerate = 0,
    percentUnknown = 0,
  } = getSchoolsData(countryWeeklyStats, mapType);

  const noConnectivityOffsetAngle = getOffsetAngle(0);
  const goodConnectivityOffsetAngle = getOffsetAngle(percentNo);
  const moderateConnectivityOffsetAngle = getOffsetAngle(
    percentNo + percentGood
  );
  const unknownConnectivityOffsetAngle = getOffsetAngle(
    percentNo + percentGood + percentModerate
  );

  return (
    <div className="pie-chart">
      <div className="pie-chart__explanation">
        <div
          className="pie-chart__percent-value"
          style={{ color: paintData.schoolConnectivity.no }}
        >
          {formatPercent(percentNo)}
        </div>
        <div
          className="pie-chart__percent-value"
          style={{ color: paintData.schoolConnectivity.good }}
        >
          {formatPercent(percentGood)}
        </div>
        <div
          className="pie-chart__percent-value"
          style={{ color: paintData.schoolConnectivity.moderate }}
        >
          {formatPercent(percentModerate)}
        </div>
        <div
          className="pie-chart__percent-value"
          style={{ color: paintData.schoolConnectivity.unknown }}
        >
          {formatPercent(percentUnknown)}
        </div>
      </div>

      <div className="pie-chart__graph">
        <svg viewBox={`0 0 ${SVG_VIEW_BOX_WIDTH} ${SVG_VIEW_BOX_HEIGHT}`}>
          {/* No connectivity */}

          <AnimatedCircle
            angle={noConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentNo}
            fullLength={CIRCUMFERENCE}
            stroke={paintData.schoolConnectivity.no}
            fill="transparent"
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* /!* Good connectivity *!/ */}

          <AnimatedCircle
            angle={goodConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentGood}
            fullLength={CIRCUMFERENCE}
            stroke={paintData.schoolConnectivity.good}
            fill="transparent"
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* /!*  Moderate connectivity *!/ */}

          <AnimatedCircle
            angle={moderateConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentModerate}
            fullLength={CIRCUMFERENCE}
            stroke={paintData.schoolConnectivity.moderate}
            fill="transparent"
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* /!* Unknown connectivity *!/ */}

          <AnimatedCircle
            angle={unknownConnectivityOffsetAngle}
            length={CIRCUMFERENCE * percentUnknown}
            fullLength={CIRCUMFERENCE}
            stroke={paintData.schoolConnectivity.unknown}
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
