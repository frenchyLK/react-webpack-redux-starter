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

const LoginError = ({ error , t, formValues }) => {
  if(!error) {
    return null;
  }

  if(error.code === ERRORS.NewPasswordRequired) {
    return (<div className={ styles.loginWarn }>
      <Link to="/reset_password">
        { t(`login:${error.code}`, { username: formValues.get('username') }) }
      </Link>
    </div>);
  }

  return (<div className={ styles.loginError }>
    { t(`login:${error.code}`, { username: formValues.get('username') }) }
  </div>);
}

const Login = (props) => {
  const { t, valid, handleSubmit, submitting } = props;
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
          <input type="submit" value="Login" disabled={ !valid || submitting } />
          <br />
          <LoginError { ...props } />
        </div>
      </form>
      <Link to="/register">{ t('login:register_now') }</Link>
    </div>
    )
};

LoginError.propTypes = Login.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.oneOf([
      'UserNotFoundException', 'NotAuthorizedException', 'NewPasswordRequired'
    ])
  }),
  handleSubmit: PropTypes.func.isRequired
}

export default Login;
