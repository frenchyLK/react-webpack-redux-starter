import SecureRoute from './secure-route.presentation';
import { selectUser } from 'cognito-redux/selectors';
import hocs from 'common-hocs';

const mapState = (state, props) => ({
  user: selectUser(state, props)
});

export default hocs({ redux: { mapState }})(SecureRoute);
