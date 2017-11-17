import React from 'react';
import Login from 'login';
import Register from 'register';
import Verify from 'verify';
import Header from 'header';
import ResetPassword from 'reset-password';
import Dashboard from 'dashboard';
import { Route, Switch } from 'react-router-dom';
import SecureRoute from 'secure-route';
import styles from './index.scss';

const App = () => {
  return (<div className={ styles.appWrapper }>
    <Header />
    <Switch>
      <Route path="/login" component={ Login }/>
      <Route path="/:username/verify" component={ Verify }/>
      <Route path="/reset_password" component={ ResetPassword }/>
      <Route path="/register" component={ Register }/>
      <SecureRoute component={ Dashboard } />
    </Switch>
  </div>);
}

export default App;
