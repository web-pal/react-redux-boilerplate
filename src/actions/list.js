import { normalize, Schema, arrayOf } from 'normalizr';

import fetch from '../utils/fetch';
import config from '../config';


export const CHANGE_ENDPOINT_LOADING_STATE = 'CHANGE_ENDPOINT_LOADING_STATE';

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


export const FILL_LIST = 'FILL_LIST';
export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM';
export const EDIT_LIST_ITEM = 'EDIt_LIST_ITEM';
export const CHANGE_ITEM_PROCESS_STATE = 'CHANGE_ITEM_PROCESS_STATE';

export function getList() {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ENDPOINT_LOADING_STATE,
      meta: { endpoint: 'list' },
      payload: true
    });
    fetch(`${config.baseUrl}/list`).then((jsonData) => {
      dispatch({
        type: CHANGE_ENDPOINT_LOADING_STATE,
        meta: { endpoint: 'list' },
        payload: false
      });

      const response = normalize({ list: jsonData }, {
        list: arrayOf(schemas.list)
      });

      dispatch({
        type: FILL_LIST,
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
      type: CHANGE_ENDPOINT_LOADING_STATE,
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
        type: CHANGE_ENDPOINT_LOADING_STATE,
        meta: { endpoint: 'listAdd' },
        payload: false
      });

      dispatch({
        type: ADD_LIST_ITEM,
        payload: jsonData
      });
    });
  };
}

export function removeItemFromList(id) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ITEM_PROCESS_STATE,
      meta: { id, action: 'remove' },
      payload: true
    });

    fetch(
      `${config.baseUrl}/list`,
      { method: 'DELETE', body: JSON.stringify({ id }) }
    ).then(() => {
      dispatch({
        type: CHANGE_ITEM_PROCESS_STATE,
        meta: { id, action: 'remove' },
        payload: false
      });

      dispatch({
        type: REMOVE_LIST_ITEM,
        payload: id
      });
    });
  };
}

export function editItemFromList(id, data) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ITEM_PROCESS_STATE,
      meta: { id, action: 'edit' },
      payload: true
    });

    fetch(
      `${config.baseUrl}/list`,
      { method: 'PATCH', body: JSON.stringify(data) }
    ).then(() => {
      dispatch({
        type: CHANGE_ITEM_PROCESS_STATE,
        meta: { id, action: 'edit' },
        payload: false
      });

      dispatch({
        type: EDIT_LIST_ITEM,
        meta: { id },
        payload: data
      });
    });
  };
}
