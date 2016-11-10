import { Record, Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';

/* eslint-disable new-cap */
const InitialState = Record({
  listIds: new List(),
  listMap: new Map()
});
/* eslint-enable new-cap */
const initialState = new InitialState();


export default function list(state = initialState, action) {
  switch (action.type) {
    case types.FILL_LIST:
      return state.set('listIds', fromJS(action.payload.ids))
              .set('listMap', fromJS(action.payload.map));
    case types.ADD_LIST_ITEM:
      return state.update(
        'listIds',
        ids => (ids.push(action.payload.id))
      ).update(
        'listMap',
        map => (map.set(action.payload.id, fromJS(action.payload)))
      );
    case types.REMOVE_LIST_ITEM:
      return state.update(
        'listIds',
        ids => (ids.delete(ids.findIndex(id => (id === action.payload))))
      ).update(
        'listMap',
        map => (map.delete(action.payload))
      );
    case types.EDIT_LIST_ITEM:
      return state.update(
        'listMap',
        map => (
          map.update(
            action.meta.id,
            item => (item.merge(action.payload))
          )
        )
      );
    case types.CHANGE_LIST_ITEM_PROCESS_STATE:
      return state.update(
        'listMap',
        map => (
          map.update(
            action.meta.id,
            item => (item.set(`${action.meta.action}Inprocess`, action.payload))
          )
        )
      );
    default:
      return state;
  }
}
