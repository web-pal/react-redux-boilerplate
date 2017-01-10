import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';
import * as types from '../actions/actionTypes';

const citiesIds = (state = new List(), action) => {
  switch (action.type) {
    case types.FILL_CITIES_LIST:
      return fromJS(action.payload.citiesIds);
    default:
      return state;
  }
};

const citiesById = (state = new Map(), action) => {
  switch (action.type) {
    case types.FILL_CITIES_LIST:
      return fromJS(action.payload.citiesById);
    default:
      return state;
  }
};

const meta = (state = new Map({ fetching: true }), action) => {
  switch (action.type) {
    case types.FETCH_CITIES_STATE:
      return state.set('fetching', action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  citiesIds,
  citiesById,
  meta
});
