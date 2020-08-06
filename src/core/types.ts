export type VoidFn<Result = void> =
  | (() => Result)
  | ((payload: void) => Result);

export const argumentHistory = (fn: jest.Mock): unknown[] =>
  fn.mock.calls.map(([argument]) => argument);
