import React from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import DemoField from 'demo-field';
import { login } from 'cognito-redux/actions';
import { ERRORS } from 'cognito-redux/constants';
import classNames from 'classnames';
import LoadingSpinner from 'loading-spinner';
import { List } from 'immutable';

const MANAGED_ERRORS = List([
  ERRORS.NewPasswordRequired, ERRORS.AttributesRequired, ERRORS.MFARequired
]);

const LoginError = ({ error, t, formValues }) => {

  if(error && !MANAGED_ERRORS.contains(error.code)) {
    return (<div className={ styles.loginError }>
      { t(`login:${error.code}`, { username: formValues.get('username'), message: error.message }) }
    </div>);
  }

  return null;
}

const MFASection = ({ mfa, t, change }) => {
  if(!mfa) {
    return null;
  }

  return (<div>
    <fieldset>
      <br />
      <div className={ styles.loginWarn }>
        { t(`login:MFARequired`) }
      </div>
      <br />
      <label>{ t('login:mfa_code')}</label>
      <Field required={ true } component={ DemoField } type="text" name="mfaCode" />
      <br />
    </fieldset>
    <br />
  </div>)
}

const NewPasswordSection = ({ newPasswordRequired, t }) => {
  if(!newPasswordRequired) {
    return null;
  }

  return (<div>
    <fieldset>
      <br/>
      <div className={ styles.loginWarn }>
        { t(`login:NewPasswordRequired`) }
      </div>
      <br />
      <label>{ t('login:new_password')}</label>
      <Field required={ true } component={ DemoField } type="text" name="newPassword" />
      <br />
      </fieldset>
    <br/>
  </div>);
}

const AdditionalAttributesSection = ({ attributesRequired, t }) => {

  if(!attributesRequired || attributesRequired.length === 0) {
    return null;
  }

  return (<div>
    <fieldset>
      <br/>
      <div className={ styles.loginWarn }>
        { t(`login:AttributesRequired`) }
      </div>
      <br/>
      {
        attributesRequired.map((attr, i) => (
          <div key={ `${attr}:${i}`}>
            <label>{ t(`login:${attr}`)}</label>
            <Field required={ true } component={ DemoField } type="text" name={ `attributesData.${attr}` } />
            <br />
          </div>
        ))
      }
    </fieldset>
    <br />
  </div>);
}

const Login = (props) => {
  const {
    t, valid, handleSubmit, submitting
  } = props;

  const finalFormClassName = classNames(
    styles.loginForm,
    { [styles.submitting]: submitting }
  )

  return (
    <div className={ styles.loginPage }>
      <form onSubmit={ handleSubmit(login) } disabled={ !valid || submitting }>
        <div className={ finalFormClassName }>
          <h1>Login</h1>
          { submitting ? (<div className={ styles.spinner }><LoadingSpinner /></div>) : null }
          <label>{ t('login:username') }</label>
          <Field component={ DemoField } type="text" name="username" />
          <br />
          <label>{ t('login:password') }</label>
          <Field component={ DemoField } type="password" name="password" />
          <br />
          <NewPasswordSection { ...props } />
          <AdditionalAttributesSection { ...props } />
          <MFASection { ...props } />
          <input type="submit" value="Login" disabled={ !valid || submitting } />
          <br />
          <LoginError { ...props } />
        </div>
      </form>
      <Link to="/register">{ t('login:register_now') }</Link>
    </div>
    )
};

MFASection.propTypes = AdditionalAttributesSection.propTypes = NewPasswordSection.propTypes = LoginError.propTypes = Login.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  newPasswordRequired: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.oneOf(Object.values(ERRORS))
  }),
  attributesRequired: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired
}

export default Login;
