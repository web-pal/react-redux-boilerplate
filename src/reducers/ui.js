import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';

const defaultState = fromJS({
  isLoading: true
});

function ui(state = defaultState, action) {
  switch (action.type) {
    case types.IS_LOADING:
      return state.set('isLoading', action.payload);

    default:
      return state;
  }
}


export default ui;
