import { REDUCER_NAME } from './reducer';
import { createSelector } from 'reselect';

const selectReducer = state => state.get(REDUCER_NAME);

export const selectNewPasswordRequired = createSelector(
  [selectReducer],
  reducer => reducer.get(['loginErrors', 'newPasswordRequired'])
)

export const selectAttributesRequired = createSelector(
  [selectReducer],
  reducer => reducer.getIn(['loginErrors', 'attributesRequired'])
)

export const selectMFA = createSelector(
  [selectReducer],
  reducer => reducer.get('mfa')
)
export const selectUserSession = createSelector(
  [selectReducer],
  reducer => reducer.getIn(['mfa', 'session'])
)
