import { useStore } from 'effector-react';
import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { formatConnectionSpeed } from '~/core/formatters';
import { formatDateInterval } from '~/lib/date-fns-kit/format-date-interval';

import {
  $historyData,
  $historyDataPending,
  $historyInterval,
  $historyIntervalUnit,
  $historyPlaceName,
  $isCurrentHistoryInterval,
  changeHistoryIntervalUnit,
  closeHistoryModal,
  nextHistoryInterval,
  previousHistoryInterval,
} from '@/map/@/country/model';
import { getPercent } from '@/map/@/sidebar/ui/get-week-graph-data';
import { Scroll } from '@/scroll';

import {
  getHistoryGraphData,
  HistoryGraphItem,
} from './get-history-graph-data';
import { ProgressLine } from './progress-bar';

const HistoryGraphContent = ({
  daysData,
}: {
  daysData: HistoryGraphItem[];
}) => {
  const intervalUnit = useStore($historyIntervalUnit);
  if (!daysData) {
    return null;
  }

  return (
    <>
      {daysData.map((item) => {
        return (
          <div
            className={`history-modal__graph-item history-modal__graph-item--${intervalUnit}`}
            key={item.date}
          >
            <div className="history-modal__graph-pillar">
              <div
                className="history-modal__graph-filler"
                style={{
                  height: item.speedPercent,
                  backgroundColor: item.fillColor,
                }}
              >
                <div className="week-graph__tooltip">
                  <span>{item?.speed}</span>
                  <span>{item?.date}</span>
                </div>
              </div>
            </div>
            <div className="history-modal__horizontal-scale">
              <div className="history-modal__horizontal-scale-value">
                {item?.date.slice(0, 6)}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const HistoryGraph = () => {
  const pending = useStore($historyDataPending);

  const historyData = useStore($historyData);
  const historyInterval = useStore($historyInterval);

  const historyGraphData = getHistoryGraphData(historyData, historyInterval);

  const averageValue = formatConnectionSpeed(
    historyGraphData.speedSum / historyGraphData.itemsCount
  );

  const averageLineBottom = historyGraphData.itemsCount
    ? getPercent(
        historyGraphData.speedSum / historyGraphData.itemsCount,
        historyGraphData.maxSpeed
      )
    : null;

  return (
    <div className="history-modal__graph">
      {pending ? (
        <ProgressLine visible />
      ) : (
        <>
          <div className="history-modal__vertical-scale">
            <span className="history-modal__vertical-scale-value">50 mb/s</span>
          </div>
          <div className="history-modal__vertical-scale" />
          <div className="history-modal__vertical-scale">
            <span className="history-modal__vertical-scale-value">25 mb/s</span>
          </div>
          <div className="history-modal__vertical-scale" />
          <div className="history-modal__vertical-scale">
            <span className="history-modal__vertical-scale-value">0 mb/s</span>
          </div>
          {averageLineBottom && (
            <div
              className="history-modal__average"
              style={{
                bottom: averageLineBottom.toString(),
              }}
            >
              <span className="history-modal__average-value">
                {averageValue}
              </span>
            </div>
          )}
          <div className="history-modal__graph-content">
            <HistoryGraphContent daysData={historyGraphData?.daysData} />
          </div>
        </>
      )}
    </div>
  );
};

export const HistoryModal = () => {
  const intervalUnit = useStore($historyIntervalUnit);
  const interval = useStore($historyInterval);
  const isCurrentInterval = useStore($isCurrentHistoryInterval);

  const formattedInterval = formatDateInterval(
    interval,
    intervalUnit,
    isCurrentInterval
  );

  const placeName = useStore($historyPlaceName);

  return (
    <div className="history-modal__wrapper">
      <div className="history-modal">
        <Scroll>
          <div className="history-modal__scrollable">
            <div className="history-modal__header">
              <div className="history-modal__title">
                Average download speed {'>'} {placeName}
              </div>
              <button
                onClick={() => closeHistoryModal()}
                className="search-bar__close"
                type="button"
              >
                <span className="visually-hidden">Close modal</span>
              </button>
            </div>

            <div className="history-modal__controls">
              <div className="history-modal__period-picker period-picker">
                <button
                  onClick={() => previousHistoryInterval()}
                  type="button"
                  className="period-picker__button"
                >
                  <Chevron className="chevron chevron--left" />
                </button>

                <div className="period-picker__period">{formattedInterval}</div>

                <button
                  onClick={() => nextHistoryInterval()}
                  disabled={isCurrentInterval}
                  type="button"
                  className="period-picker__button"
                >
                  <Chevron className="chevron" />
                </button>
              </div>

              <div className="history-modal__period-unit-picker">
                <button
                  type="button"
                  onClick={() => changeHistoryIntervalUnit('day')}
                  className={`history-modal__period-unit ${
                    intervalUnit === 'day'
                      ? 'history-modal__period-unit--active'
                      : ''
                  }`}
                >
                  daily
                </button>
                <button
                  type="button"
                  onClick={() => changeHistoryIntervalUnit('week')}
                  className={`history-modal__period-unit ${
                    intervalUnit === 'week'
                      ? 'history-modal__period-unit--active'
                      : ''
                  }`}
                >
                  weekly
                </button>
                <button
                  type="button"
                  onClick={() => changeHistoryIntervalUnit('month')}
                  className={`history-modal__period-unit ${
                    intervalUnit === 'month'
                      ? 'history-modal__period-unit--active'
                      : ''
                  }`}
                >
                  monthly
                </button>
              </div>
            </div>

            <HistoryGraph />
          </div>
        </Scroll>
      </div>
    </div>
  );
};