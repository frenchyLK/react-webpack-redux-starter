import { REDUCER_NAME } from './reducer';
import { createSelector } from 'reselect';

const selectReducer = (state) => state.get(REDUCER_NAME);

export const selectSubReddits = createSelector(
  [selectReducer],
  reducer => reducer.get('subreddits')
)

export const selectPosts = createSelector(
  [selectReducer],
  reducer => reducer.get('posts')
)
