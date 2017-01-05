import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';


function allItems(state = new List(), action) {
  switch (action.type) {
    case types.FILL_LIST:
      return fromJS(action.payload.ids);
    case types.ADD_LIST_ITEM:
      return state.push(action.payload.id);
    case types.REMOVE_LIST_ITEM:
      return state.filter(item => item !== action.payload);
    default:
      return state;
  }
}


function itemsById(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_LIST:
      return fromJS(action.payload.map);
    case types.ADD_LIST_ITEM:
      return state.set(action.payload.id, fromJS(action.payload));
    case types.REMOVE_LIST_ITEM:
      return state.delete(action.payload);
    case types.EDIT_LIST_ITEM:
      return state.update(action.meta.id, item => (item.merge(action.payload)));
    case types.CHANGE_LIST_ITEM_PROCESS_STATE:
      return state.update(
        action.meta.id,
        item => (item.set(`${action.meta.action}Inprocess`, action.payload))
      );
    default:
      return state;
  }
}

function meta(state = new Map({ fetching: false, addInProcess: false }), action) {
  switch (action.type) {
    case types.FETCH_LIST_STATE:
      return state.set('fetching', action.payload);
    case types.ADD_LIST_STATE:
      return state.set('addInProcess', action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  byId: itemsById,
  allIds: allItems,
  meta
});
