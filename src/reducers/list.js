import { Record } from 'immutable';

import { GET_LIST, GET_LIST_START } from '../actions/list';

/* eslint-disable new-cap */
const InitialState = Record({
  quantity: 0,
  isFetching: false,
  list: []
});
/* eslint-enable new-cap */
const initialState = new InitialState();


export default function tables(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_START:
      return state.withMutations((ctx) => {
        ctx.set('isFetching', true)
            .set('quantity', action.quantity);
      });
    case GET_LIST:
      return state.withMutations((ctx) => {
        ctx.set('isFetching', false)
            .set('quantity', action.quantity)
            .set('list', action.list);
      });
    default:
      return state;
  }
}
