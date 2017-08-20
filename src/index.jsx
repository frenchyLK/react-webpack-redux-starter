import 'regenerator-runtime/runtime';
import 'isomorphic-fetch';
import ReactDOM from 'react-dom';
import React from 'react';
import App from 'app';
import i18n from 'i18n';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import { VERSION, RELEASE } from 'APP_CONFIG';
import { Provider } from 'react-redux';
import history from 'history';
import createStore from './store';
import './index.scss';

const store = createStore();

const renderApp = (Component) => {
  ReactDOM.render(
    (<AppContainer>
      <Provider store={ store }>
        <I18nextProvider i18n={ i18n }>
          <Router history={ history }>
            <Component />
          </Router>
        </I18nextProvider>
      </Provider>
    </AppContainer>),
    document.getElementById('app')
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextRoot = require('./app').default;
    renderApp(NextRoot);
  });
}

window.__APP_INFORMATION = {
  version: VERSION,
  release: RELEASE
};
