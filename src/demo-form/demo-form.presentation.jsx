import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'loading-spinner';
import styles from './styles';
import AutobindComponent from 'autobind-component';
import classnames from 'classnames';

const FormError = ({ error, t, formValues }) => {
  if(error) {
    const errorValues = formValues ? formValues.toJS() : {};

    const finalErrorValues = {
      ...errorValues,
      message: error.message
    }

    return (<div className={ styles.errors }>
      <div className={ styles.error }>
      { t(`errors:${error.code}`, { ...finalErrorValues }) }
      </div>
    </div>);
  }

  return null;
}

class DemoForm extends AutobindComponent {


  render() {
    const { onSubmit, header, submitting, valid, children, submitLabel, handleSubmit, error } = this.props;

    const finalFormClassName = classnames(
      styles.demoForm,
      { [styles.submitting]: submitting }
    )

    return (<div className={ finalFormClassName }>
      { header ? (<h1>{ header }</h1>) : null }
      <form onSubmit={ handleSubmit(onSubmit) } disabled={ !valid || submitting }>
        { submitting ? (<div className={ styles.spinner }><LoadingSpinner /></div>) : null }
        {
          children instanceof Function ?
          children(this.props) :
          children
        }
        {
          submitLabel ?
          (<input className={ styles.submitButton } type="submit" value={ submitLabel } disabled={ !valid || submitting } />) :
          null
        }
        {
          error ?
          (<FormError { ...this.props } />) :
          null
        }
      </form>
    </div>);
  }
}

FormError.propTypes = DemoForm.propTypes = {
  header: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.any,
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string
  })
}

export default DemoForm
