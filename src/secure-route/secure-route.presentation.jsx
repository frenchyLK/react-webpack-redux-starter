import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const SecureRoute = ({ user, component, ...rest }) => {
  return (<Route {...rest} render={props => (
    user ? (<component {...props}/>) : (<Redirect to={{ pathname: '/login'}}/>)
  )}/>);
};

SecureRoute.propTypes = {
  user: PropTypes.any,
  component: PropTypes.any
};

export default SecureRoute;
