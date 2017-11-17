import { takeLatest, put } from 'redux-saga/effects'
import { schema } from 'normalizr';
import { fromJS, List, Map, Set } from 'immutable';
import { createRoutine as rsrCreateRoutine } from 'redux-saga-routines';
import stages from 'redux-saga-routines/dist/routineStages';

export const SUCCESS_POSTFIX = 'SUCCESS';

export const selectEntities = entityName => reducer => reducer.getIn(
  ['entities', entityName],
  Map()
);

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
  const finalPayload = fromJS(action.payload);

  return mergeResults(
    mergeEntities(state, finalPayload.get('entities')),
    determineSchemaKey(action.meta.schema),
    finalPayload.get('result')
  );
}

export const createRoutine = (props) => {
  const { name, metaCreator, payloadCreator } = typeof(props) === 'string' ?
    { name: props } :
    props;

  const routine = rsrCreateRoutine(name, payloadCreator);

  return Object.assign(routine, {
    ...routine,
    ...List(stages).toMap().mapKeys((_, item) => item.toLowerCase()).map(stage => {
      const stageName = stage.toLowerCase();
      const stageAction = routine[stageName];

      // only want to give the meta to the success action
      if(!metaCreator || stageName !== 'success') {
        return stageAction;
      }

      return (payload) => {
        const meta = typeof(metaCreator) === 'function' ?
          metaCreator(payload) :
          metaCreator;

        const action = stageAction(payload);

        return {
          ...action,
          meta
        };
      }
    }).toJS()
  });
};
