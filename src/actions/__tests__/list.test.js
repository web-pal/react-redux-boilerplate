import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as types from '../actionTypes';
import * as actions from '../list';
import config from '../../config';

require('isomorphic-fetch');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('list actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  window.localStorage = { jwt: 'testJWT' };

  // getList()
  it('creates FILL_LIST and FETCH_LIST_STATE when getList fired', () => {
    const ids = ['1'];
    const item = {
      1: {
        id: '1',
        ...actions.listDefaults
      }
    };
    const map = { ...item };

    const expectedActions = [
      { type: types.FETCH_LIST_STATE, payload: true },
      { type: types.FILL_LIST, payload: { ids, map } },
      { type: types.FETCH_LIST_STATE, payload: false }
    ];
    const store = mockStore();

    nock(config.baseUrl)
      .get('/list')
      .reply(200, [{ id: '1' }]);

    return store.dispatch(actions.getList())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // removeItemFromList()
  it('creates REMOVE_LIST_ITEM and CHANGE_LIST_ITEM_PROCESS_STATE when removeItemFromList fired', () => {
    const id = '10';
    const expectedActions = [
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'remove' }, payload: true },
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'remove' }, payload: false },
      { type: types.REMOVE_LIST_ITEM, payload: id }
    ];
    const store = mockStore();

    // Mock fetch request
    nock(config.baseUrl)
      .delete('/list')
      .reply(200, { success: true });

    return store.dispatch(actions.removeItemFromList(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // editItemInList()
  it('creates EDIT_LIST_ITEM and CHANGE_LIST_ITEM_PROCESS_STATE when editItemFromList fired', () => {
    const id = '10';
    const firstName = 'test';
    const lastName = 'test';
    const expectedActions = [
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'edit' }, payload: true },
      { type: types.CHANGE_LIST_ITEM_PROCESS_STATE, meta: { id, action: 'edit' }, payload: false },
      { type: types.EDIT_LIST_ITEM, meta: { id }, payload: { firstName, lastName } }
    ];
    const store = mockStore();

    nock(config.baseUrl)
       .intercept('/list', 'PATCH')
      .reply(200, { success: true });

    return store.dispatch(actions.editItemInList(id, { firstName, lastName }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // addItemToList()
  it('creates ADD_LIST_ITEM and ADD_LIST_STATE when addItemToList fired', () => {
    const id = '10';
    const firstName = 'test';
    const lastName = 'test';
    const listItem = { firstName, lastName, id };

    const expectedActions = [
      { type: types.ADD_LIST_STATE, payload: true },
      { type: types.ADD_LIST_ITEM, payload: listItem },
      { type: types.ADD_LIST_STATE, payload: false }
    ];
    const store = mockStore();

    nock(config.baseUrl)
      .post('/list')
      .reply(200, listItem);

    return store.dispatch(actions.addItemToList(listItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
