/* eslint-disable @typescript-eslint/naming-convention */

import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { CountryStatistics } from 'src/api/types';

import { formatPercent } from '~/core/formatters';

import { $countryStatistics } from '@/map/@/country/model';
import { connectivityStatusPaintData } from '@/map/constants';

const getPercentage = (value: number, total: number): number =>
  total && value / total;

const getSchoolsData = (countryStatistics: CountryStatistics) => {
  const {
    schools_connectivity_no,
    schools_connectivity_good,
    schools_connectivity_moderate,
    schools_connectivity_unknown,
    schools_total,
  } = countryStatistics;

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

// pie chart constants
//-----------------------------------------------------
const SVG_VIEW_BOX_WIDTH = 20;
const SVG_VIEW_BOX_HEIGHT = 20;
const CIRCLE_CENTER_X = 10;
const CIRCLE_CENTER_Y = 10;
const CIRCLE_RADIUS = 9;
const STROKE_WIDTH = 2;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const START_OFFSET_ANGLE = 180; // chart start from left
//-----------------------------------------------------

const FULL_CIRCLE_ANGLE = 360;
const getOffsetAngle = (offsetPercent: number): number =>
  FULL_CIRCLE_ANGLE * offsetPercent + START_OFFSET_ANGLE;

export const PieChart = () => {
  const countryStatistics = useStore($countryStatistics);

  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimationStarted(Boolean(countryStatistics)));
  }, [countryStatistics]);

  if (!countryStatistics) {
    return null;
  }

  const {
    percentConnectivityNo = 0,
    percentConnectivityGood = 0,
    percentConnectivityModerate = 0,
    percentConnectivityUnknown = 0,
  } = isAnimationStarted ? getSchoolsData(countryStatistics) : {};

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
      {isAnimationStarted && (
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
      )}
      <div className="pie-chart__graph">
        <svg viewBox={`0 0 ${SVG_VIEW_BOX_WIDTH} ${SVG_VIEW_BOX_HEIGHT}`}>
          {/* No connectivity */}

          <circle
            className="pie-chart__progress"
            style={{
              transform: `rotate(${noConnectivityOffsetAngle}deg)`,
              transformOrigin: 'center',
            }}
            stroke={connectivityStatusPaintData.no}
            fill="transparent"
            strokeDasharray={`${
              CIRCUMFERENCE * percentConnectivityNo
            }, ${CIRCUMFERENCE}`}
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* Good connectivity */}

          <circle
            className="pie-chart__progress"
            style={{
              transform: `rotate(${goodConnectivityOffsetAngle}deg)`,
              transformOrigin: 'center',
            }}
            stroke={connectivityStatusPaintData.good}
            fill="transparent"
            strokeDasharray={`${
              CIRCUMFERENCE * percentConnectivityGood
            }, ${CIRCUMFERENCE}`}
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/*  Moderate connectivity */}

          <circle
            className="pie-chart__progress"
            style={{
              transform: `rotate(${moderateConnectivityOffsetAngle}deg)`,
              transformOrigin: 'center',
            }}
            stroke={connectivityStatusPaintData.moderate}
            fill="transparent"
            strokeDasharray={`${
              CIRCUMFERENCE * percentConnectivityModerate
            }, ${CIRCUMFERENCE}`}
            strokeWidth={STROKE_WIDTH}
            cx={CIRCLE_CENTER_X}
            cy={CIRCLE_CENTER_Y}
            r={CIRCLE_RADIUS}
          />

          {/* Unknown connectivity */}

          <circle
            className="pie-chart__progress"
            style={{
              transform: `rotate(${unknownConnectivityOffsetAngle}deg)`,
              transformOrigin: 'center',
            }}
            stroke={connectivityStatusPaintData.unknown}
            fill="transparent"
            strokeDasharray={`${
              CIRCUMFERENCE * percentConnectivityUnknown
            }, ${CIRCUMFERENCE}`}
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
