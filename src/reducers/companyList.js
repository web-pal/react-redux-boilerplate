import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';

function allItems(state = new List(), action) {
  switch (action.type) {
    case types.FILL_COMPANY_LIST:
      return fromJS(action.payload.companyIds);
    default:
      return state;
  }
}

function itemsById(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_COMPANY_LIST:
      return fromJS(action.payload.companyMap);
    default:
      return state;
  }
}

function employeeById(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_COMPANY_LIST:
      return fromJS(action.payload.employeeMap);
    default:
      return state;
  }
}

function toggleEmployeeVisibility(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_COMPANY_LIST:
      return fromJS(action.payload.companyMap).map(() => false);
    case types.TOGGLE_EMPLOYEE:
      return state.set(action.payload.companyId.toString(),
        !state.get(action.payload.companyId.toString()));
    default:
      return state;
  }
}

export default combineReducers({
  byId: itemsById,
  allIds: allItems,
  employee: employeeById,
  showEmployee: toggleEmployeeVisibility
});
