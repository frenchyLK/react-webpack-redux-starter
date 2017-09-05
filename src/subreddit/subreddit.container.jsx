import hocs from 'common-hocs';
import { fetchPosts } from 'reddit-api-redux/actions';
import { selectCurrentPosts } from './selectors';
import SubReddit from './subreddit.presentation';

const mapState = (state, props) => ({
  posts: selectCurrentPosts(state, props)
});

const mapDispatch = {
  fetchPosts: fetchPosts.trigger
}

export default hocs({ i18n: 'subreddit', redux: { mapState, mapDispatch } })(SubReddit);
