import { add, isBefore, sub } from 'date-fns';
import { combine, guard, sample } from 'effector';

import {
  fetchCountryHistoryFx,
  fetchSchoolHistoryFx,
} from '~/api/project-connect';
import { getInterval, isCurrentInterval } from '~/lib/date-fns-kit';
import { getInverted, setPayload } from '~/lib/effector-kit';

import { $country, $countryCode, $countryDailyStats } from '@/country/model';
import {
  $historyData,
  $historyDataPending,
  $historyDataType,
  $historyInterval,
  $historyIntervalUnit,
  $historyPlaceName,
  $isCurrentHistoryInterval,
  $isNextHistoryIntervalAvailable,
  $isOpenHistoryModal,
  $isPreviousHistoryIntervalAvailable,
  changeHistoryDataType,
  changeHistoryIntervalUnit,
  closeHistoryModal,
  nextHistoryInterval,
  previousHistoryInterval,
} from '@/history-modal/model';
import { $school, $schoolDailyStats, $schoolId } from '@/popup/model';
import { $week } from '@/sidebar/model';

$historyIntervalUnit.on(changeHistoryIntervalUnit, setPayload);
$historyDataType.on(changeHistoryDataType, setPayload);
$historyDataType.reset(closeHistoryModal);
$historyIntervalUnit.reset(closeHistoryModal);

sample({
  source: $week,
  target: $historyInterval,
});

sample({
  source: $historyDataType,
  fn: (historyDataType) => Boolean(historyDataType),
  target: $isOpenHistoryModal,
});

sample({
  source: $historyIntervalUnit,
  fn: (unit) => getInterval(new Date(), unit),
  target: $historyInterval,
});

sample({
  source: $week,
  clock: closeHistoryModal,
  target: $historyInterval,
});

sample({
  source: combine([$historyInterval, $historyIntervalUnit]),
  fn: ([interval, unit]) => isCurrentInterval(interval, unit),
  target: $isCurrentHistoryInterval,
});

sample({
  source: $isCurrentHistoryInterval,
  fn: getInverted,
  target: $isNextHistoryIntervalAvailable,
});

sample({
  source: combine([$historyInterval, $country]),
  fn: ([interval, country]) => {
    if (!country) {
      return false;
    }
    return isBefore(new Date(country.date_schools_mapped), interval.start);
  },
  target: $isPreviousHistoryIntervalAvailable,
});

sample({
  source: combine([$historyInterval, $historyIntervalUnit]),
  clock: nextHistoryInterval,
  fn: ([interval, unit]) =>
    getInterval(add(interval.start, { [`${unit}s`]: 1 }), unit),
  target: $historyInterval,
});

sample({
  source: combine([$historyInterval, $historyIntervalUnit]),
  clock: previousHistoryInterval,
  fn: ([interval, unit]) =>
    getInterval(sub(interval.start, { [`${unit}s`]: 1 }), unit),
  target: $historyInterval,
});

sample({
  source: guard({
    source: combine({
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
      countryDailyStats: $countryDailyStats,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'country' && interval === week),
  }),
  fn: ({ countryDailyStats }) => countryDailyStats,
  target: $historyData,
});

sample({
  source: guard({
    source: combine({
      countryCode: $countryCode,
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'country' && interval !== week),
  }),
  fn: ({ countryCode, interval }) => ({ countryCode, interval }),
  target: fetchCountryHistoryFx,
});

sample({
  source: guard({
    source: combine({
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
      schoolDailyStats: $schoolDailyStats,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'school' && interval === week),
  }),
  fn: ({ schoolDailyStats }) => schoolDailyStats,
  target: $historyData,
});

sample({
  source: guard({
    source: combine({
      schoolId: $schoolId,
      interval: $historyInterval,
      historyDataType: $historyDataType,
      week: $week,
    }),
    filter: ({ historyDataType, interval, week }) =>
      Boolean(historyDataType === 'school' && interval !== week),
  }),
  fn: ({ schoolId, interval }) => ({ schoolId, interval }),
  target: fetchSchoolHistoryFx,
});

$historyData.on(fetchCountryHistoryFx.doneData, setPayload);
$historyData.on(fetchSchoolHistoryFx.doneData, setPayload);
$historyData.reset(closeHistoryModal);

sample({
  source: guard({
    source: combine({
      historyDataType: $historyDataType,
      country: $country,
    }),
    filter: ({ historyDataType, country }) =>
      Boolean(historyDataType === 'country' && country),
  }),
  fn: ({ country }) => country?.name ?? '',
  target: $historyPlaceName,
});

sample({
  source: guard({
    source: combine({
      historyDataType: $historyDataType,
      school: $school,
    }),
    filter: ({ historyDataType, school }) =>
      Boolean(historyDataType === 'school' && school),
  }),
  fn: ({ school }) => school?.name ?? '',
  target: $historyPlaceName,
});

$historyPlaceName.reset(closeHistoryModal);

sample({
  source: combine([
    fetchCountryHistoryFx.pending,
    fetchSchoolHistoryFx.pending,
  ]),
  fn: (states) => states.some(Boolean),
  target: $historyDataPending,
});
