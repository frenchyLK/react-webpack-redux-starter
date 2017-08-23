import createRootReducer from 'root-reducer';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import normalizrMiddleware from 'redux-normalizr-middleware';
import cognitoSagas from 'cognito-redux/sagas';
import loginSagas from 'login/sagas';
import redditSagas from 'reddit-api-redux/sagas';
import { routinesWatcherSaga } from 'redux-saga-routines';
import { Map } from 'immutable';
import { persistStore, autoRehydrate } from 'redux-persist-immutable'

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware, normalizrMiddleware()];

const defaultSagas = [
  routinesWatcherSaga,
  cognitoSagas,
  loginSagas,
  redditSagas
];

export default (defaultState = Map()) => {
  const store = createStore(
    createRootReducer(),
    defaultState,
    composeEnhancers(applyMiddleware(...middlewares), autoRehydrate())
  );

  persistStore(store, { whitelist: [ 'cognito' ] });

  defaultSagas.map(sagaMiddleware.run);

  store.asyncReducers = {};
  store.asyncSagas = {};
  return store;
};

export const injectAsyncReducer = (store, name, reducer, sagas) => {
  if(!store.asyncSagas[name]) {
    store.asyncSagas[name] = sagas;
    sagaMiddleware.run(sagas);
  }

  store.asyncReducers[name] = reducer;
  store.replaceReducer(createRootReducer(store.asyncReducers));
  return store;
};
