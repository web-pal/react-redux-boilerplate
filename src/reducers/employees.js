import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';

export function employeesById(state = new Map(), action) {
  switch (action.type) {
    case types.ADD_EMPLOYEES:
      return state.concat(
        fromJS(action.payload.employeesMap)
      );
    case types.FILL_EMPLOYEES:
      return fromJS(action.payload.employeesMap);
    default:
      return state;
  }
}

export default combineReducers({
  byId: employeesById
});
