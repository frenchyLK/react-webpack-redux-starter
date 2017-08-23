import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import appReducer, { REDUCER_NAME as APP_REDUCER_NAME } from 'app/reducer';
import redditReducer, { REDUCER_NAME as REDDIT_REDUCER_NAME } from 'reddit-api-redux/reducer';
import cognitoReducer, { REDUCER_NAME as COGNITO_REDUCER_NAME } from 'cognito-redux/reducer';

export default (asyncReducers) => combineReducers({
  form: reduxFormReducer,
  [APP_REDUCER_NAME]: appReducer,
  [COGNITO_REDUCER_NAME]: cognitoReducer,
  [REDDIT_REDUCER_NAME]: redditReducer,
  ...asyncReducers
})
