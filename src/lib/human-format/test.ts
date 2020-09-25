import { humanFormat } from './human-format';

const numbers = [
  -1_234_567_890_000,
  -12_345_678_900,
  -1_234_567.89,
  -123_456_789,
  -12_345.678,
  -1234,
  -123,
  -12.345,
  -1.234,
  -1,
  -0,
  0,
  0.123,
  0.789,
  0,
  1,
  1.234,
  12.345,
  123,
  1234,
  12_345.678,
  1_234_567.89,
  123_456_789,
  12_345_678_900,
  1_234_567_890_000,
];

// eslint-disable-next-line @typescript-eslint/unbound-method
const formatFn = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 3,
}).format;

describe('humanFormat', () => {
  it('works', () => {
    const formatted = numbers.map((number) => humanFormat(number));

    expect(formatted).toEqual([
      '-1234.6G',
      '-12.3G',
      '-1.2M',
      '-123.5M',
      '-12.3k',
      '-1.2k',
      '-123',
      '-12',
      '-1',
      '-1',
      '0',
      '0',
      '0',
      '0',
      '0',
      '1',
      '1',
      '12',
      '123',
      '1.2k',
      '12.3k',
      '1.2M',
      '123.5M',
      '12.3G',
      '1234.6G',
    ]);
  });

  it('support units', () => {
    const formatted = humanFormat(1_234_567.89, { unit: 'b/s' });

    expect(formatted).toEqual('1.2Mb/s');
  });

  it('support separator', () => {
    const formatted = humanFormat(1_234_567.89, { separator: ' ' });

    expect(formatted).toEqual('1.2 M');
  });

  it('support separator and unit', () => {
    const formatted = humanFormat(12_345.678, {
      unit: 'b/s',
      separator: ' ',
    });

    expect(formatted).toEqual('12.3 kb/s');
  });

  it('support formatFn', () => {
    const formatted = humanFormat(1_234_567.89, { formatFn });

    expect(formatted).toEqual('1,235M');
  });

  it('support formatFn, separator and unit', () => {
    const formatted = humanFormat(1_234_567.89, {
      formatFn,
      unit: 'b/s',
      separator: ' ',
    });

    expect(formatted).toEqual('1,235 Mb/s');
  });

  it('support useFraction', () => {
    const formattedA = humanFormat(-1234, {
      fractional: true,
    });

    expect(formattedA).toEqual('-1.2k');

    const formattedB = humanFormat(876_543_210, {
      fractional: true,
    });

    expect(formattedB).toEqual('0.9G');
  });
});
