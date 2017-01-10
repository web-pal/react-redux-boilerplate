import { normalize, schema } from 'normalizr';

import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';


export const listDefaults = {
  removeInprocess: false,
  editInprocess: false
};

export const schemas = {
  list: new schema.Entity(
    'list', {}, {
      processStrategy: value => ({ ...value, ...listDefaults })
    }
  )
};


export function getList() {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_LIST_STATE,
      payload: true
    });
    return fetch(`${config.baseUrl}/list`).then((jsonData) => {
      const response = normalize({ list: jsonData }, {
        list: [schemas.list]
      });

      dispatch({
        type: types.FILL_LIST,
        payload: {
          ids: response.result.list,
          map: response.entities.list
        }
      });

      dispatch({
        type: types.FETCH_LIST_STATE,
        payload: false
      });
    });
  };
}

export function addItemToList(newItem) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ADD_LIST_STATE,
      payload: true
    });

    return fetch(
      `${config.baseUrl}/list`,
      { method: 'POST', body: JSON.stringify(newItem) }
    ).then((json) => {
      let jsonData = json;
      if (config.fakeFetch) {
        // On real project use data returned from the server
        jsonData = newItem;
        const lastId = getState().list.allIds.last();
        jsonData.id = (parseInt(lastId, 10) + 1).toString();
      }

      dispatch({
        type: types.ADD_LIST_ITEM,
        payload: jsonData
      });

      dispatch({
        type: types.ADD_LIST_STATE,
        payload: false
      });
    });
  };
}


export function changeItemListProcessState(id, action, payload) {
  return {
    type: types.CHANGE_LIST_ITEM_PROCESS_STATE,
    meta: { id, action },
    payload
  };
}

export function removeItemFromList(id) {
  return (dispatch) => {
    dispatch(changeItemListProcessState(id, 'remove', true));

    return fetch(
      `${config.baseUrl}/list`,
      { method: 'DELETE', body: JSON.stringify({ id }) }
    ).then(() => {
      dispatch(changeItemListProcessState(id, 'remove', false));

      dispatch({
        type: types.REMOVE_LIST_ITEM,
        payload: id
      });
    });
  };
}

export function editItemInList(id, data) {
  return (dispatch) => {
    dispatch(changeItemListProcessState(id, 'edit', true));

    return fetch(
      `${config.baseUrl}/list`,
      { method: 'PATCH', body: JSON.stringify(data) }
    ).then(() => {
      dispatch(changeItemListProcessState(id, 'edit', false));

      dispatch({
        type: types.EDIT_LIST_ITEM,
        meta: { id },
        payload: data
      });
    });
  };
}
