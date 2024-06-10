import { DocumentsType } from "../types/documentsEnum";
import { getDocuments } from "../../api/apiDocuments";
import { put, call, takeEvery } from "redux-saga/effects";
import { DocumentsInterface } from "../reducers/documentsReducer";

type responseDocuments = {
  error_code: number;
  error_message: string;
  data: DocumentsInterface[];
  profiling: string;
  timings: string | null;
};

function* fetchDocuments() {
  try {
    yield put({ type: DocumentsType.startLoading });
    const res: responseDocuments = yield call(getDocuments);
    yield put({
      type: DocumentsType.getAllDocumentsSucceed,
      payload: res.data,
    });
  } catch (e) {
    yield put({
      type: DocumentsType.getAllDocumentsFailed,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* getDocumentsSaga() {
  yield takeEvery(DocumentsType.getAllDocumentsRequested, fetchDocuments);
}
