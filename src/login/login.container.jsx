import hocs from 'common-hocs';
import Login from './login.presentation';
import validate from './validate';

export const FORM_NAME = 'login';

const form = { form: FORM_NAME, validate };

export default hocs({ form, i18n: 'login' })(Login);
