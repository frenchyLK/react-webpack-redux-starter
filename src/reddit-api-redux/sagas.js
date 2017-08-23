import { fetchTopSubrredits } from './api';
import { fetchSubReddits } from './actions';
import { takeLatestRoutine } from './utils';

const onFetchSubreddits = () => {
  return fetchTopSubrredits();
}

export default function* () {
  yield takeLatestRoutine(fetchSubReddits, onFetchSubreddits)
}
