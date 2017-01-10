import { combineReducers } from 'redux';
import { List, Map, fromJS } from 'immutable';
import * as types from '../actions/actionTypes';

const habitantsIds = (state = new List(), action) => {
  switch (action.type) {

    case types.FILL_CITIES_LIST:
      return action.payload.habitantsIds;

    default:
      return state;
  }
};

const habitantsByIds = (state = new Map(), action) => {
  switch (action.type) {
    case types.FILL_CITIES_LIST:
      return action.payload.habitantsById;
    default:
      return state;
  }
};

export default combineReducers({
  habitantsIds,
  habitantsByIds
});
