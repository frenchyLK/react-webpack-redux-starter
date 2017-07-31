import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import hocs from 'common-hocs';

const DemoField = ({ label, input, type, meta: { error, warning, touched }, t }) => {
  return (
    <div className={ styles.demoField }>
      {
        label ?
        (<label>{ label }</label>) :
        null
      }
      <input {...input} type={ type } />
      {
        touched && error ?
        (<span className={ styles.error }>{ t(error) }</span>) :
        null
      }
      {
        touched && warning ?
        (<span className={ styles.warning }>{ t(warning) }</span>) :
        null
      }
    </div>
  );
}

DemoField.propTypes = {
  label: PropTypes.node,
  input: PropTypes.any,
  type: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.node,
    warning: PropTypes.node
  }),
  t: PropTypes.func.isRequired
}

export default hocs({ i18n: [] })(DemoField);
