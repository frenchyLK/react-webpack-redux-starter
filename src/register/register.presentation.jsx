import React from 'react';
import styles from './index.scss';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { register } from 'cognito-redux/actions';
import AutobindComponent from 'autobind-component';
import { ERRORS } from 'cognito-redux/constants';
import DemoForm from 'demo-form';
import DemoField from 'demo-field';

class Register extends AutobindComponent {

  render() {
    const { t } = this.props;

    return (
      <div className={ styles.registerPage }>
        <DemoForm form='register' onSubmit={ register } header={ t('register:register') } submitLabel={ t('register:register') }>
          <Field
            required={ true } component={ DemoField }
            type="text" name="username" label={ t('register:email') }
          />
          <Field
            required={ true } component={ DemoField }
            type="password" name="password" label={ t('register:password') }
          />
          <Field
            required={ true } component={ DemoField }
            type="password" name="confirmPassword" label={ t('register:confirm_password') }
          />
        </DemoForm>
      </div>
      )
  }
}

Register.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.oneOf(Object.values(ERRORS))
  })
}

export default Register;
