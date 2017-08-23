import { takeLatest, put } from 'redux-saga/effects'
import { schema } from 'normalizr';
import { fromJS } from 'immutable';

export const takeLatestRoutine = (routine, handler) => {
  return takeLatest(routine.TRIGGER, function* (action) {
    try {
      yield put(routine.request());

      const result = yield handler(action);

      yield put(routine.success(result));

    } catch (e) {
      yield put(routine.failure(e));
    }

    yield put(routine.fulfill());
  });
}

const mergeEntities = (state, newEntities) => {
  return state
    .updateIn(['entities'], Map(), entities => entities.mergeDeep(newEntities));
}

const mergeResults = (state, key, result) => {
  return state
    .updateIn(['result', key], Set(), items => items.merge(result));
}

const determineSchemaKey = (currentSchema) => {
  // @TODO Extend this to support more schemas

  if(currentSchema instanceof schema.Array) {
    return currentSchema.schema.key;
  }

  if(Array.isArray(currentSchema)) {
    return currentSchema[0].key;
  }

  return currentSchema.key;
};

export const mergeNormalized = (state, action) => {
  const finalPayload = fromJS(action.payload.data);

  return mergeResults(
    mergeEntities(state, finalPayload.get('entities')),
    determineSchemaKey(action.payload.schema),
    finalPayload.get('result')
  );
}
