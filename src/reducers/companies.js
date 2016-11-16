import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';


function allItems(state = new List(), action) {
  switch (action.type) {
    case types.FILL_LIST_EMPLOYEES:
      return fromJS(action.payload.ids);
    default:
      return state;
  }
}


function itemsById(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_LIST_EMPLOYEES:
      return fromJS(action.payload.map);
    case types.REMOVE_EMPLOYEE: {
      const newEmployeeList = state.get(action.payload.companyId).get('employees').filter(emp => emp !== action.payload.employee);
      const newCompanyEmployeesList = state.get(action.payload.companyId).set('employees', newEmployeeList);
      return state.set(action.payload.companyId, newCompanyEmployeesList);
    }
    default:
      return state;
  }
}

function employees(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_LIST_EMPLOYEES:
      return fromJS(action.payload.employees);
    case types.REMOVE_EMPLOYEE:
      return state.filter(item => item.get('id') !== action.payload.employee);
    default:
      return state;
  }
}

export default combineReducers({
  byId: itemsById,
  allIds: allItems,
  employees
});
