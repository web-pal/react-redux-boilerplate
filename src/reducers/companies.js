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
    default:
      return state;
  }
}

function employees(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_LIST_EMPLOYEES:
      return fromJS(action.payload.employees);
    default:
      return state;
  }
}

export default combineReducers({
  byId: itemsById,
  allIds: allItems,
  employees
});
