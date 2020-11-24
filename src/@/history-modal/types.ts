import { ConnectionStatus } from '~/api/types';

export type StatsDataType = 'country' | 'school';

export type HistoryGraphData = {
  daysData: HistoryGraphItem[];
  speedSum: number;
  itemsCount: number;
  maxSpeed: number;
};

export type HistoryGraphItem = {
  date: string;
  speedFormatted?: string;
  speed?: number;
  status?: ConnectionStatus;
};
