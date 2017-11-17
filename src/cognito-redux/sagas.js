import { login, register, verify } from './actions';
import { authorize, signUp, verifyUser } from './api';
import { takeLatestRoutine } from 'utils';
import { SubmissionError } from 'redux-form/immutable'

function* onLogin({ payload }) {
  try {
    return yield authorize(payload.toJS());
  } catch (e) {
    throw new SubmissionError({ _error: e });
  }
}

function* onRegister({ payload }) {
  try {
    return yield signUp(payload.toJS());
  } catch (e) {
    throw new SubmissionError({ _error: e });
  }
}

function* onVerify({ payload }) {
  try {
    return yield verifyUser(payload.toJS());
  } catch (e) {
    throw new SubmissionError({ _error: e });
  }
}

export default function* () {
  yield takeLatestRoutine(login, onLogin)
  yield takeLatestRoutine(register, onRegister)
  yield takeLatestRoutine(verify, onVerify)
}
