import { handleActions } from 'redux-actions';
import { fetchSubReddits, fetchPosts } from './actions';
import { fromJS } from 'immutable';

export const REDUCER_NAME = 'reddit';

export default handleActions({
  [fetchSubReddits.SUCCESS]: (state, { payload }) => state.set('subreddits', fromJS(payload)),
  [fetchPosts.SUCCESS]: (state, { payload }) => state.update('posts', posts => posts.set(payload.subreddit, fromJS(payload.posts)))
}, fromJS({ posts: {} }));
