export type Maybe<T> = T | void;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export const isNil = <T>(value: Maybe<T>): value is void => value == null;
export const isDefined = <T>(value: Maybe<T>): value is T => !isNil(value);
