import { handleActions } from 'redux-actions';
import { fetchSubReddits } from './actions';
import { Map } from 'immutable';

export const REDUCER_NAME = 'reddit';

export default handleActions({
  [fetchSubReddits.SUCCESS]: (state, action) => state.set('subreddits', action.payload)
}, Map());
