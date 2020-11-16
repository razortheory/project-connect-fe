import clsx from 'clsx';
import { useStore } from 'effector-react';
import React from 'react';

import Chevron from '~/assets/images/chevron.svg';
import { formatConnectionSpeed } from '~/core/formatters';
import { formatDateInterval } from '~/lib/date-fns-kit/format-date-interval';
import { ProgressBar } from '~/ui';

import { getHistoryGraphData } from '@/history-modal/lib';
import {
  $historyData,
  $historyDataPending,
  $historyInterval,
  $historyIntervalUnit,
  $historyPlaceName,
  $isCurrentHistoryInterval,
  $isNextHistoryIntervalAvailable,
  $isPreviousHistoryIntervalAvailable,
  changeHistoryIntervalUnit,
  closeHistoryModal,
  nextHistoryInterval,
  previousHistoryInterval,
} from '@/history-modal/model';
import { HistoryGraphData } from '@/history-modal/types';
import { $stylePaintData } from '@/map/model';
import { Scroll } from '@/scroll';
import { getPercent } from '@/week-graph/lib';
import { Filler } from '@/week-graph/ui';

const HistoryGraphContent = ({ data }: { data: HistoryGraphData }) => {
  const intervalUnit = useStore($historyIntervalUnit);
  const paintData = useStore($stylePaintData);
  if (!data) {
    return null;
  }

  return (
    <>
      {data.daysData.map((item) => {
        const height = getPercent(item.speed ?? 0, data.maxSpeed);
        return (
          <div
            className={`history-modal__graph-item week-graph__item history-modal__graph-item--${intervalUnit}`}
            key={item.date}
          >
            <div className="history-modal__graph-pillar">
              <Filler
                height={height}
                background={paintData.schoolConnectivity[item.status ?? 'no']}
              >
                <div className="week-graph__tooltip">
                  <span>{item?.speedFormatted}</span>
                  <span>{item?.date}</span>
                </div>
              </Filler>
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
  const historyData = useStore($historyData);
  const historyInterval = useStore($historyInterval);
  const pending = useStore($historyDataPending);

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
      <div className="history-modal__vertical-scale">
        <span className="history-modal__vertical-scale-value">
          {formatConnectionSpeed(historyGraphData.maxSpeed)}
        </span>
      </div>
      <div className="history-modal__vertical-scale" />
      <div className="history-modal__vertical-scale">
        <span className="history-modal__vertical-scale-value">
          {formatConnectionSpeed(historyGraphData.maxSpeed / 2)}
        </span>
      </div>
      <div className="history-modal__vertical-scale" />
      <div className="history-modal__vertical-scale">
        <span className="history-modal__vertical-scale-value">0 mb/s</span>
      </div>
      {!pending && (
        <>
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
            <HistoryGraphContent data={historyGraphData} />
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
  const isNextIntervalAvailable = useStore($isNextHistoryIntervalAvailable);
  const isPreviousIntervalAvailable = useStore(
    $isPreviousHistoryIntervalAvailable
  );

  const formattedInterval = formatDateInterval(
    interval,
    intervalUnit,
    isCurrentInterval
  );

  const placeName = useStore($historyPlaceName);
  const isUppercaseName = placeName === placeName?.toUpperCase();
  const pending = useStore($historyDataPending);

  return (
    <div className="history-modal__wrapper">
      <div className="history-modal">
        <ProgressBar pending={pending} />
        <Scroll>
          <div className="history-modal__scrollable">
            <div className="history-modal__header">
              <div className="history-modal__title">
                Average download speed
                {' > '}
                <span
                  className={clsx('history-modal__place-name', {
                    'history-modal__place-name--capitalize': isUppercaseName,
                  })}
                >
                  {isUppercaseName ? placeName?.toLowerCase() : placeName}
                </span>
              </div>
              <button
                onClick={() => closeHistoryModal()}
                className="search-bar__close history-modal__close link"
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
                  disabled={!isPreviousIntervalAvailable}
                  className="period-picker__button"
                >
                  <Chevron className="chevron chevron--left" />
                </button>

                <div className="period-picker__period">{formattedInterval}</div>

                <button
                  onClick={() => nextHistoryInterval()}
                  disabled={!isNextIntervalAvailable}
                  type="button"
                  className="period-picker__button"
                >
                  <Chevron className="chevron" />
                </button>
              </div>

              <div className="history-modal__period-unit-picker">
                <button
                  type="button"
                  onClick={() => changeHistoryIntervalUnit('week')}
                  className={clsx('history-modal__period-unit', {
                    'history-modal__period-unit--active':
                      intervalUnit === 'week',
                  })}
                >
                  weekly
                </button>
                <button
                  type="button"
                  onClick={() => changeHistoryIntervalUnit('month')}
                  className={clsx('history-modal__period-unit', {
                    'history-modal__period-unit--active':
                      intervalUnit === 'month',
                  })}
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
