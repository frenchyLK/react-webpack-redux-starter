import { handleActions } from 'redux-actions';
import { login } from './actions';
import { Map, fromJS } from 'immutable';
import { ERRORS } from './constants';

export const REDUCER_NAME = 'cognito';

export default handleActions({
  [login.SUCCESS]: (state, { payload }) => state
    .set('user', payload)
    .remove('loginErrors')
    .remove('mfa'),
  [login.FAILURE]: (state, { payload }) => state
    .update(
      'loginErrors',
      (errors = Map()) => {
        const { code, attributesRequired } = payload.errors._error;

        if(code === ERRORS.NewPasswordRequired) {
          return errors.set('newPasswordRequired', true);
        }

        if(code === ERRORS.AttributesRequired) {
          return errors.set('attributesRequired', fromJS(attributesRequired))
        }

        if(code === ERRORS.MFARequired) {
          return undefined;
        }
      }
    )
    .update(
      'mfa',
      mfa => payload.errors._error.code === ERRORS.MFARequired ? fromJS({ session: payload.errors._error.session }) : mfa
    )
}, Map())
