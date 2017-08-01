import React from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import DemoField from 'demo-field';
import { login } from 'cognito-redux/actions';

const Login = ({ t, valid, handleSubmit, error }) => {
  return (
    <div className={ styles.loginPage }>
      { error ? <label>{ error }</label> : null }
      <form className={ styles.loginForm } onSubmit={ handleSubmit(login) }>
        <h1>Login</h1>
        <label>{ t('login:username') }</label>
        <Field component={ DemoField } type="text" name="username" />
        <br />
        <label>{ t('login:password') }</label>
        <Field component={ DemoField } type="password" name="password" />
        <br />
        <input type="submit" value="Login" disabled={ !valid } />
      </form>
      <Link to="/register">{ t('login:register_now') }</Link>
    </div>
    )
};

Login.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired
}

export default Login;
