import hocs from 'common-hocs';
import Dashboard from './dashboard.presentation';
import { selectSubReddits } from 'reddit-api-redux/selectors';
import { fetchSubReddits } from 'reddit-api-redux/actions';
import { push } from 'react-router-redux';

const mapState = (state, props) => ({
  subReddits: selectSubReddits(state, props)
});

const mapDispatch = {
  fetchSubReddits: fetchSubReddits.trigger,
  push
};

export default hocs({ redux: { mapState, mapDispatch }, i18n: [ 'dashboard' ], router: true })(Dashboard);
