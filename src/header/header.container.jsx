import hocs from 'common-hocs';
import Header from './header.presentation';
import { selectUser } from 'cognito-redux/selectors';
import { logout } from 'cognito-redux/actions';

const mapState = (state) => ({
  user: selectUser(state)
})

const mapDispatch = {
  logout
};

export default hocs({ i18n: 'header', router: true, redux: { mapState, mapDispatch } })(Header);
