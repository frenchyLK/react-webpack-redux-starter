import React from 'react';
import styles from './index.scss';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { verify } from 'cognito-redux/actions';
import AutobindComponent from 'autobind-component';
import { ERRORS } from 'cognito-redux/constants';
import LoadingSpinner from 'loading-spinner';
import DemoField from 'demo-field';

const VerifyError = ({ error, t, formValues }) => {

  if(error) {
    return (<div className={ styles.verifyError }>
      { t(`verify:${error.code}`, { username: formValues.get('username'), message: error.message }) }
    </div>);
  }

  return null;
}


class Verify extends AutobindComponent {

  render() {
    const {
      t, valid, handleSubmit, submitting, initialValues
    } = this.props;

    return (
      <div className={ styles.verifyPage }>
        <form initialValues={ initialValues } onSubmit={ handleSubmit(verify) } disabled={ !valid || submitting }>
          <div>
            <h1>Verify</h1>
            { submitting ? (<div className={ styles.spinner }><LoadingSpinner /></div>) : null }
            <Field required={ true } component={ DemoField } type="text" name="code" label={ t('verify:code') }/>
            <input type="submit" value="Verify" disabled={ !valid || submitting } />
            <VerifyError { ...this.props } />
          </div>
        </form>
      </div>
      )
  }
}

VerifyError.propTypes = Verify.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.oneOf(Object.values(ERRORS))
  }),
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}

export default Verify;
