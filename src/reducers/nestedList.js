import {combineReducers} from 'redux';
import {Map, List, fromJS} from 'immutable';

import * as types from '../actions/actionTypes';

function citiesIds(state = new List([1]), action) {
  switch (action.type) {

    case types.FILL_CITIES_LIST:
      return fromJS(action.payload.cityIds);

    default:
      return state;
  }
}

function citiesById(state = fromJS({'1': {id: 0, firstName: 'Brooklyn'}}), action) {
  switch (action.type) {

    case types.FILL_CITIES_LIST:
      return fromJS(action.payload.cityMap);

    default:
      return state;
  }
}

function habitantsById(state = fromJS({'1': {id: 1, firstName: 'Jack'}}), action) {
  switch (action.type) {

    case types.FILL_CITIES_LIST:
      return fromJS(action.payload.habitantMap);

    default:
      return state;
  }
}


export default combineReducers({
  citiesIds,
  citiesById,
  habitantsById
});
