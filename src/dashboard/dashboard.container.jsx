import hocs from 'common-hocs';
import Dashboard from './dashboard.presentation';
import { selectSubReddits } from 'reddit-api-redux/selectors';
import { fetchPosts } from 'reddit-api-redux/actions';

const mapState = (state, props) => ({
  subReddits: selectSubReddits(state, props)
});

const mapDispatch = {
  fetchPosts: fetchPosts.trigger
};

export default hocs({ redux: { mapState, mapDispatch }})(Dashboard);
