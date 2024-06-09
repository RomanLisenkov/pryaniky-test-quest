import { legacy_createStore as createStore } from 'redux';

import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from '../reducers/rootReducer';
import { initState } from '../initState';




export const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools()
);
export type RootState = ReturnType<typeof store.getState>;