export type Nil = null | undefined;
export const isNil = <T>(value: T | Nil): value is Nil => value === null || value === undefined;
export const isDefined = <T>(value: T | Nil): value is T => !isNil(value);
export const isObject = <T>(value: T | Object): value is Object => typeof value === 'object';
