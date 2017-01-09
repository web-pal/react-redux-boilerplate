import {normalize, schema} from 'normalizr';
import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';

export const schemas = {
  users: new schema.Entity('users'),
};

export function getNestedList() {
  return (dispatch) => {
    return fetch(`${config.baseUrl}/nested-list`).then((jsonData) => {
      const response = normalize({ users: jsonData }, {
        users: [schemas.users]
      });

      dispatch({
        type: types.FILL_NESTED_LIST,
        payload: {
          ids: response.result.users,
          map: response.entities.users
        }
      });
    });
  };
}

