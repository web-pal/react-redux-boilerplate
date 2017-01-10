import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';
import * as types from '../actions/actionTypes';

const habitantsIds = (state = new List(), action) => {
  switch (action.type) {

    case types.FILL_CITIES_LIST:
      return fromJS(action.payload.habitantsIds);

    default:
      return state;
  }
};

const habitantsById = (state = new Map(), action) => {
  switch (action.type) {

    case types.FILL_CITIES_LIST:
      return fromJS(action.payload.habitantsById);

    default:
      return state;
  }
};

export default combineReducers({
  habitantsIds,
  habitantsById
});
