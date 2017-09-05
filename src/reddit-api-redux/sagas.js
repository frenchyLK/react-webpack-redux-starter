import { fetchTopSubrredits, fetchRedditPosts } from './api';
import { fetchSubReddits, fetchPosts } from './actions';
import { takeLatestRoutine } from './utils';
import { select } from 'redux-saga/effects'
import { selectPosts } from 'reddit-api-redux/selectors';

const onFetchSubreddits = () => {
  return fetchTopSubrredits();
}

function* onFetchPosts({ payload }) {
  const posts = yield select(selectPosts);

  return posts.has(payload.name) ? posts.get(payload.name) : yield fetchRedditPosts(payload);
}

export default function* () {
  yield takeLatestRoutine(fetchSubReddits, onFetchSubreddits);
  yield takeLatestRoutine(fetchPosts, onFetchPosts);
}
