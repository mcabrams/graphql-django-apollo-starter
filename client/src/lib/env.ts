import { isNil, isObject } from '@src/helpers/presence';

declare global {
  interface Window {
    _env_: unknown;
  }
}

export const env = (property: string) => {
  if (isNil(window._env_)) {
    throw new Error('_env_ not present on window');
  }

  if (!isObject(window._env_)) {
    throw new Error('_env_ is not an object');
  }

  // @ts-ignore TODO: Fix this
  return window._env_[property];
};
