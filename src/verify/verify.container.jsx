import hocs from 'common-hocs';
import Verify from './verify.presentation';
import validate from './validate';
import { selectFormValues, selectUserName } from './selectors';
import { FORM_NAME } from './constants';

const form = {
  form: FORM_NAME,
  validate
};

const mapState = (state, props) => ({
  formValues: selectFormValues(state),
  initialValues: {
    username: selectUserName(state, props)
  }
});

export default hocs({
  form,
  i18n: 'verify',
  redux: { mapState }
})(Verify);
