import { login } from 'cognito-redux/actions';
import { takeLatest, put } from 'redux-saga/effects'
import { change } from 'redux-form/immutable';
import { ERRORS } from 'cognito-redux/constants';
import { FORM_NAME } from './constants';

function* onMFARequired({ payload }) {
  const { errors } = payload;

  if(errors._error.code === ERRORS.MFARequired) {
    yield put(change(FORM_NAME, 'mfaSession', errors._error.session));
  }
}

export default function* () {
  yield takeLatest(login.FAILURE, onMFARequired)
}
