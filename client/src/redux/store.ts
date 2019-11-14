import { createStore } from 'redux';

import rootReducer from './root-reducer';

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(
  rootReducer,
  initialState,
  // @ts-ignore
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// export store singleton instance
export default store;
