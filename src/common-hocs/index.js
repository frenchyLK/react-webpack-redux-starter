import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';

const id = e => e;

export default({ i18n, redux, router = false, form }) => WrappedComponent => {
  const _translate = i18n ? translate(i18n) : id;
  const _connect = redux ? connect(redux.mapState, redux.mapDispatch) : id;
  const _router = router ? withRouter : id;
  const _form = form ? reduxForm(form) : id;

  const finalHoc = compose(_connect, _translate, _router, _form);

  return finalHoc(WrappedComponent);
};
