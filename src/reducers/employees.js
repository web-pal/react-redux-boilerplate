import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';


export function employeesItems(state = new List(), action) {
  switch (action.type) {
    case types.ADD_EMPLOYEES:
      return state.concat(fromJS(action.payload.employeesIds));
    case types.FILL_COMPANIES:
      return fromJS(action.payload.employeesIds);
    default:
      return state;
  }
}

export function employeesItemsById(state = new Map(), action) {
  switch (action.type) {
    case types.ADD_EMPLOYEES:
      return state.concat(fromJS(action.payload.employeesMap));
    case types.FILL_COMPANIES:
      return fromJS(action.payload.employeesMap);
    default:
      return state;
  }
}

export default combineReducers({
  employeesAllIds: employeesItems,
  employeesById: employeesItemsById
});
