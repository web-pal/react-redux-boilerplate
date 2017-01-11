import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';


function companiesItems(state = new List(), action) {
  switch (action.type) {
    case types.ADD_COMPANIES:
      return state.push(action.payload.companyIds);
    case types.FILL_COMPANIES:
      return fromJS(action.payload.companyIds);
    default:
      return state;
  }
}

function companiesItemsById(state = new Map(), action) {
  switch (action.type) {
    case types.ADD_COMPANIES:
      return state.set(action.payload.companyIds,
        fromJS(action.payload.companyMap[action.payload.companyIds]));
    case types.FILL_COMPANIES:
      return fromJS(action.payload.companyMap);
    default:
      return state;
  }
}

export default combineReducers({
  byId: companiesItemsById,
  allIds: companiesItems
});
