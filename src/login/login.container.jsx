import hocs from 'common-hocs';
import Login from './login.presentation';
import validate from './validate';
import { selectFormValues } from './selectors';
import { selectNewPasswordRequired, selectAttributesRequired, selectMFARequired } from 'cognito-redux/selectors';
import { FORM_NAME } from './constants';

const form = {
  form: FORM_NAME,
  validate
};

const mapState = state => ({
  formValues: selectFormValues(state),
  newPasswordRequired: selectNewPasswordRequired(state),
  attributesRequired: selectAttributesRequired(state),
  mfaRequired: selectMFARequired(state)
});

export default hocs({
  form,
  i18n: 'login',
  redux: { mapState }
})(Login);
