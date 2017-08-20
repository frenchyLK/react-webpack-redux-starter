import React from 'react';
import Login from 'login';
import Register from 'register';
import Header from 'header';
import ResetPassword from 'reset-password';
import Dashboard from 'dashboard';
import { Route } from 'react-router-dom';
import SecureRoute from 'secure-route';

const App = () => {
  return (<div>
    <Header />
    <Route path="/login" component={ Login }/>
    <Route path="/reset_password" component={ ResetPassword }/>
    <Route path="/register" component={ Register }/>
    <SecureRoute path="/dashboard" component={ Dashboard }/>
  </div>);
};

export default App;
