import { DocumentsType } from "../types/documentsEnum";
import { addDocument } from "../../api/apiDocuments";
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

function* fetchAddDocument(action: {
  payload: { document: DocumentInterface };
}) {
  try {
    const res: responseDocument = yield call(
      addDocument,
      action.payload.document,
    );
    if (res.error_code !== 0) {
      throw new Error(res.error_text);
    }
    yield put({
      type: DocumentsType.addDocumentSucceed,
      payload: res.data,
    });
  } catch (e) {
    yield put({
      type: DocumentsType.addDocumentFailed,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* addDocumentSaga() {
  yield takeEvery(DocumentsType.addDocumentRequested, fetchAddDocument);
}
