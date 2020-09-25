import { format, Interval } from 'date-fns';

export const formatInterval = ({ start, end }: Interval): string =>
  `${format(start, 'd')}-${format(end, 'd LLL u')}`;
