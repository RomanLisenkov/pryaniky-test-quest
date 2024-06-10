import {
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import createSagaMiddleWare from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "../reducers/rootReducer";
import { rootSaga } from "../saga/rootSaga";


const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
