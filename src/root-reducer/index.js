import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import redditReducer, { REDUCER_NAME as REDDIT_REDUCER_NAME } from 'reddit-api-redux/reducer';
import cognitoReducer, { REDUCER_NAME as COGNITO_REDUCER_NAME } from 'cognito-redux/reducer';
import { routerReducer } from 'react-router-redux';

export default (asyncReducers) => combineReducers({
  form: reduxFormReducer,
  [COGNITO_REDUCER_NAME]: cognitoReducer,
  [REDDIT_REDUCER_NAME]: redditReducer,
  'router': routerReducer,
  ...asyncReducers
})
