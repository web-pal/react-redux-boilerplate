import {combineReducers} from 'redux';
import {Map, List, fromJS} from 'immutable';

import * as types from '../actions/actionTypes';

function allItems(state = new List([1]), action) {
  switch (action.type) {

    case types.FILL_NESTED_LIST:
      return fromJS(action.payload.ids);

    default:
      return state;
  }
}

function itemsById(state = new Map({empty: 'not filled'}), action) {
  switch (action.type) {

    case types.FILL_NESTED_LIST:
      return fromJS(action.payload.map);

    default:
      return state;
  }
}


export default combineReducers({
  nbyId: itemsById,
  nallIds: allItems,
});
