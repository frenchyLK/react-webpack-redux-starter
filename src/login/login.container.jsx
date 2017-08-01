import hocs from 'common-hocs';
import Login from './login.presentation';
import validate from './validate';
import { selectFormValues } from './selectors';
import { FORM_NAME } from './constants';

const form = { form: FORM_NAME, validate };

const mapState = state => ({
  formValues: selectFormValues(state)
});

export default hocs({
  form,
  i18n: 'login',
  redux: { mapState }
})(Login);
