import { normalize, Schema, arrayOf } from 'normalizr';

import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';


export const schemas = {
  list: new Schema(
    'list', {
      defaults: {
        removeInprocess: false,
        editInprocess: false
      }
    }
  ),
};


export function getList() {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_ENDPOINT_LOADING_STATE,
      meta: { endpoint: 'list' },
      payload: true
    });
    fetch(`${config.baseUrl}/list`).then((jsonData) => {
      dispatch({
        type: types.CHANGE_ENDPOINT_LOADING_STATE,
        meta: { endpoint: 'list' },
        payload: false
      });

      const response = normalize({ list: jsonData }, {
        list: arrayOf(schemas.list)
      });

      dispatch({
        type: types.FILL_LIST,
        payload: {
          ids: response.result.list,
          map: response.entities.list
        }
      });
    });
  };
}

export function addItemToList(newItem) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CHANGE_ENDPOINT_LOADING_STATE,
      meta: { endpoint: 'listAdd' },
      payload: true
    });

    fetch(
      `${config.baseUrl}/list`,
      { method: 'POST', body: JSON.stringify(newItem) }
    ).then(() => {
      // On real project use data returned from the server data
      const jsonData = newItem;
      const lastId = getState().list.get('listIds').last();
      jsonData.id = (parseInt(lastId, 10) + 1).toString();

      dispatch({
        type: types.CHANGE_ENDPOINT_LOADING_STATE,
        meta: { endpoint: 'listAdd' },
        payload: false
      });

      dispatch({
        type: types.ADD_LIST_ITEM,
        payload: jsonData
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

export function editItemFromList(id, data) {
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
