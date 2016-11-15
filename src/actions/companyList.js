import { normalize, Schema, arrayOf } from 'normalizr';

import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';

const list = new Schema('list');

const employees = new Schema('employees');

employees.define({
  companyName: list
});

list.define({
  employees: arrayOf(employees)
});

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
      });
      // console.log(response);

      dispatch({
        type: types.FILL_LIST_EMPLOYEES,
        payload: {
          ids: response.result.list,
          map: response.entities.list,
          employees: response.entities.employees
        }
      });
    });
  };
}

export default getList;
