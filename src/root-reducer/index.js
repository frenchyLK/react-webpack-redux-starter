import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import cognitoReducer, { REDUCER_NAME as COGNITO_REDUCER_NAME } from 'cognito-redux/reducer';

export default (asyncReducers) => combineReducers({
  form: reduxFormReducer,
  [COGNITO_REDUCER_NAME]: cognitoReducer,
  ...asyncReducers
})
