import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../actionTypes';
import * as actions from '../list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('list actions', () => {
  window.localStorage = { jwt: 'testJWT' };
  it('creates REMOVE_LIST_ITEM and CHANGE_LIST_ITEM_PROCESS_STATE when removeItemFromList fired', () => {
    const id = 10;
    const expectedActions = [
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'remove' }, payload: true },
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'remove' }, payload: false },
      { type: types.REMOVE_LIST_ITEM, payload: id }
    ];
    const store = mockStore();

    return store.dispatch(actions.removeItemFromList(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates EDIT_LIST_ITEM and CHANGE_LIST_ITEM_PROCESS_STATE when editItemFromList fired', () => {
    const id = 9;
    const firstName = 'test';
    const lastName = 'test';
    const expectedActions = [
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'edit' }, payload: true },
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'edit' }, payload: false },
      { type: types.EDIT_LIST_ITEM, meta: { id }, payload: { firstName, lastName } }
    ];
    const store = mockStore();

    return store.dispatch(actions.editItemFromList(id, { firstName, lastName }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
