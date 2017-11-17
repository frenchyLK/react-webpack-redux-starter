import { fetchTopSubrredits, fetchRedditPosts } from './api';
import { fetchSubReddits, fetchPosts } from './actions';
import { takeLatestRoutine } from 'utils';
import { select } from 'redux-saga/effects';
import { selectPosts } from './selectors';

const onFetchSubreddits = () => {
  return fetchTopSubrredits();
}

function* onFetchPosts({ payload }) {
  // These lines prevent posts from being fetched again if we already have any
  // post for the subreddit we're looking at. This reduces API calls
  const posts = yield select(selectPosts);
  const existingPost = posts.find(post => post.get('subreddit') === payload.name);

  return existingPost ? {} : yield fetchRedditPosts(payload);
}

export default function* () {
  yield takeLatestRoutine(fetchSubReddits, onFetchSubreddits);
  yield takeLatestRoutine(fetchPosts, onFetchPosts);
}
