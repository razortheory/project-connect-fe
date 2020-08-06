export type VoidFn<Result = void> =
  | (() => Result)
  | ((payload: void) => Result);
