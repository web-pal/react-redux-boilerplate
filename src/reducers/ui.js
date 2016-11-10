import { Record } from 'immutable';

import { CHANGE_ENDPOINT_LOADING_STATE } from '../actions/actionTypes';

/* eslint-disable new-cap */
const InitialState = Record({
  listIsLoading: false,
  listAddIsLoading: false
});
/* eslint-enable new-cap */
const initialState = new InitialState();


export default function ui(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ENDPOINT_LOADING_STATE:
      return state.set(`${action.meta.endpoint}IsLoading`, action.payload);
    default:
      return state;
  }
}

