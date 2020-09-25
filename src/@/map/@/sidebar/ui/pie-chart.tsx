import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { CountryData } from 'src/api/types';

import { $countryData } from '@/map/@/country/model';
import { connectivityStatusPaintData } from '@/map/constants';

const getPercentage = (value: number, total: number): number => {
  if (total === 0) {
    return 0;
  }
  return Number((value / total).toFixed(3));
};

const getSchoolsData = (countryData: CountryData | false) => {
  if (!countryData) {
    // return object for destructuring with initial values
    return {};
  }
  const {
    schools_connectivity_no: schoolsWithNoInternet,
    schools_connectivity_good: schoolsWithGoodInternet,
    schools_connectivity_moderate: schoolsWithModerateInternet,
    schools_connectivity_unknown: schoolsWithUnknownInternet,
    schools_total: schoolsTotal,
  } = countryData.statistics;

  return {
    percentConnectivityNo: getPercentage(schoolsWithNoInternet, schoolsTotal),
    percentConnectivityGood: getPercentage(
      schoolsWithGoodInternet,
      schoolsTotal
    ),
    percentConnectivityModerate: getPercentage(
      schoolsWithModerateInternet,
      schoolsTotal
    ),
    percentConnectivityUnknown: getPercentage(
      schoolsWithUnknownInternet,
      schoolsTotal
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
  const countryData = useStore($countryData);

  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimationStarted(Boolean(countryData)));
  }, [countryData]);

  if (!countryData) {
    return null;
  }

  const {
    percentConnectivityNo = 0,
    percentConnectivityGood = 0,
    percentConnectivityModerate = 0,
    percentConnectivityUnknown = 0,
  } = getSchoolsData(isAnimationStarted && countryData);

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
            {percentConnectivityNo * 100}%
          </div>
          <div className="pie-chart__percent-value pie-chart__percent-value--good">
            {percentConnectivityGood * 100}%
          </div>
          <div className="pie-chart__percent-value pie-chart__percent-value--moderate">
            {percentConnectivityModerate * 100}%
          </div>
          <div className="pie-chart__percent-value pie-chart__percent-value--unknown">
            {percentConnectivityUnknown * 100}%
          </div>
        </div>
      )}
      <div className="pie-chart__graph">
        <svg viewBox={`0 0 ${SVG_VIEW_BOX_WIDTH} ${SVG_VIEW_BOX_HEIGHT}`}>
          {/* NO */}

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

          {/* GOOD */}

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

          {/*  MODERATE */}

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

          {/*  UNKNOWN */}

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
