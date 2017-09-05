import hocs from 'common-hocs';
import Header from './header.presentation';
import { selectUser } from 'cognito-redux/selectors';

const mapState = (state) => ({
  user: selectUser(state)
})

export default hocs({ i18n: 'header', router: true, redux: { mapState } })(Header);
