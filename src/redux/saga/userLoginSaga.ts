import { put, call, takeEvery } from "redux-saga/effects";
import { UserType } from "../types/userEnum";
import { loginUser } from "../../api/apiUser";

type responseUser = {
  error_code: number;
  error_message: string;
  data: {
    token: string;
  };
  profiling: string;
  timings: null | string;
};

function* fetchUser(action: {
  payload: { username: string; password: string };
}) {
  try {
    yield put({ type: UserType.startLoginLoading });

    const res: responseUser = yield call(loginUser, action.payload);
    yield put({
      type: UserType.loginSucceed,
      payload: { token: res.data.token },
    });
  } catch (e) {
    yield put({
      type: UserType.loginFailed,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* userLoginSaga() {
  yield takeEvery(UserType.loginRequested, fetchUser);
}
