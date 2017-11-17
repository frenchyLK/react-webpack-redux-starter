import hocs from 'common-hocs';
import { selectFormValues } from './selectors';
import DemoForm from './demo-form.presentation';

const mapState = (state, props) => ({
  formValues: selectFormValues(state, props)
});

export default hocs({ form: {}, i18n: ['common', 'errors'], redux: { mapState } })(DemoForm)
