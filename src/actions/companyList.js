import { normalize, Schema, arrayOf } from 'normalizr';

import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';


// export const schemas = {
//   list: new Schema(
//     'list', {
//       defaults: {
//         removeInprocess: false,
//         editInprocess: false
//       }
//     }),
//   employees: new Schema('employees', {
//     defaults: {
//       removeInprocess: false,
//       editInprocess: false
//     }
//   }
//   ),
// };

// schemas.list.define({
//   company: ,
//   employees: arrayOf(schemas.employees)
// })

// const list = new Schema('list', { idAttribute: 'id' });
// const employees = new Schema('employees', { idAttribute: 'id' });

// list.define({
//   employees: arrayOf(employees)
// })


const list = new Schema('list')

const employees = new Schema('employees')

employees.define({
  companyName: list
});

list.define({
  employees: arrayOf(employees)
});

// const list = new Schema('list');
// list.define({

// })

export function getList() {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_ENDPOINT_LOADING_STATE,
      meta: { endpoint: 'list' },
      payload: true
    });
    return fetch(`${config.baseUrl}/companies`).then((jsonData) => {
      dispatch({
        type: types.CHANGE_ENDPOINT_LOADING_STATE,
        meta: { endpoint: 'list' },
        payload: false
      });

      const response = normalize({ list: jsonData }, {
        list: arrayOf(list),
        employees: arrayOf(employees)
      });
      console.log(response);

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

    return fetch(
      `${config.baseUrl}/companies`,
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
      `${config.baseUrl}/companies`,
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
      `${config.baseUrl}/companies`,
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
