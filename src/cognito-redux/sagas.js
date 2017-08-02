import { login } from './actions';
import { takeLatest, put, call } from 'redux-saga/effects'
import { login as cognitoLogin } from './api';
import { SubmissionError } from 'redux-form/immutable';

function* onLogin(action) {
  try {

    const payload = action.payload;

    yield put(login.request());

    const result = yield call(cognitoLogin, {
      username: payload.get('username'),
      password: payload.get('password')
    });

    yield put(login.success(result));
  } catch (e) {
    const error = new SubmissionError({ _error: e });

    yield put(login.failure(error));
  }

  yield put(login.fulfill());
}

export default function* () {
  yield takeLatest(login.TRIGGER, onLogin)
}
