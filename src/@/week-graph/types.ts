import { ConnectionStatus } from '~/api/types';

import { StatsDataType } from '@/history-modal/types';

export type Days =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type WeekGraphData = { [day in Days]: WeekGraphItemData };

export type WeekGraphItemData = {
  date: string;
  speed: string;
  latency: number;
  speedPercent: string;
  status: ConnectionStatus;
};

export interface WeekGraphProps {
  showButtons?: boolean;
  showHistory?: boolean;
  weekGraphData: WeekGraphData;
  dataType: StatsDataType;
}

export type WeekGraphItemProps = {
  data?: WeekGraphItemData;
  title: string;
};
