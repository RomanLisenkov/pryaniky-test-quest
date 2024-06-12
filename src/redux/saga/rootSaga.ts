import { all } from "redux-saga/effects";
import { getDocumentsSaga } from "./getDocumentsSaga";
import { userLoginSaga } from "./userLoginSaga";
import { addDocumentSaga } from "./addDocumentSaga";
import { delDocumentSaga } from "./delDocumentSaga";

export function* rootSaga() {
  yield all([
    getDocumentsSaga(),
    userLoginSaga(),
    addDocumentSaga(),
    delDocumentSaga(),
  ]);
}
