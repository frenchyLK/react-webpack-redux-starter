import { handleActions } from 'redux-actions';
import { login } from './actions';
import { Map } from 'immutable';

export const REDUCER_NAME = 'cognito';

export default handleActions({
  [login.SUCCESS]: (state, action) => state.set('user', action.payload)
}, Map())
