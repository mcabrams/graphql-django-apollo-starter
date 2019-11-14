// https://github.com/piotrwitek/typesafe-actions#extending-internal-types-to-enable-type-free-syntax-with-createreducer
import { ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('./root-action').default>;

  interface Types {
    RootAction: RootAction;
  }
}
