import React from 'react';
import Login from 'login';
import Register from 'register';
import Header from 'header';
import { Route } from 'react-router-dom';

const App = () => {
  return (<div>
    <Header />
    <Route path="/" component={ Login } exact />
    <Route path="/login" component={ Login }/>
    <Route path="/register" component={ Register }/>
  </div>);
};

export default App;
