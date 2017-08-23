import React from 'react';
import PropTypes from 'prop-types';
import Login from 'login';
import Register from 'register';
import Header from 'header';
import ResetPassword from 'reset-password';
import Dashboard from 'dashboard';
import { Route } from 'react-router-dom';
import SecureRoute from 'secure-route';
import hocs from 'common-hocs';
import { REDUCER_NAME } from './reducer';

const App = ({ rehydrate }) => {
  if(!rehydrate) {
    return (<div>Loading</div>)
  }

  return (<div>
    <Header />
    <Route path="/login" component={ Login }/>
    <Route path="/reset_password" component={ ResetPassword }/>
    <Route path="/register" component={ Register }/>
    <SecureRoute path="/dashboard" component={ Dashboard }/>
  </div>);
};

App.propTypes = {
  rehydrate: PropTypes.bool
}

const mapState = state => ({
  rehydrate: state.getIn([ REDUCER_NAME, 'rehydrate'])
});

export default hocs({ redux: { mapState } })(App);
