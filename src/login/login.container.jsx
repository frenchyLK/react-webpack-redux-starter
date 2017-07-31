import hocs from 'common-hocs';
import Login from './login.presentation';
import validate from './validate';
import { login } from 'cognito-redux/actions';

const form = { form: 'login', validate };

const mapDispatch = {
  onSubmit: login
};

export default hocs({ form, i18n: 'login', redux: { mapDispatch } })(Login);
