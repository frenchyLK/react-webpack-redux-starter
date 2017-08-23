import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

export const REDUCER_NAME = 'app';

export default handleActions({
  [REHYDRATE]: (state) => state.set('rehydrate', true)
}, Map({ rehydrate: false }));
