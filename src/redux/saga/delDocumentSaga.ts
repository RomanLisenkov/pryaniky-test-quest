import { DocumentsType } from "../types/documentsEnum";
import { addDocument, delDocument } from "../../api/apiDocuments";
import { put, call, takeEvery } from "redux-saga/effects";
import { DocumentInterface } from "../reducers/documentsReducer";

type responseDocument = {
  error_code: number;
  error_text?: string;
  error_message?: string;
  data: DocumentInterface[];
  profiling: string;
  timings: string | null;
};

function* fetchDelDocument(action: { payload: { id: string } }) {
  try {
    const res: responseDocument = yield call(delDocument, action.payload.id);
    if (res.error_code !== 0) {
      throw new Error(res.error_text);
    }
    yield put({
      type: DocumentsType.delDocumentSucceed,
      payload: { id: action.payload.id },
    });
  } catch (e) {
    yield put({
      type: DocumentsType.delDocumentFailed,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* delDocumentSaga() {
  yield takeEvery(DocumentsType.delDocumentRequested, fetchDelDocument);
}
