import { all } from "redux-saga/effects";
import { getDocumentsSaga } from "./getDocumentsSaga";
import { userLoginSaga } from "./userLoginSaga";

export function* rootSaga(){
  yield all ([getDocumentsSaga(), userLoginSaga()])
}