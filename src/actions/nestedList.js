import {normalize, schema} from 'normalizr';
import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';

export const schemas = {
  city: new schema.Entity('cities'),
};

const input = [{
  name: 'dima',
  id: 0
}, {
  name: 'jane',
  id: 1
}, {
  name: 'jasmine',
  id: 2
}];

const user = new schema.Entity('users');
const users = [ user ];

console.log('Testing facility: ', normalize(input, users));



export function getNestedList() {
  return (dispatch) => {
    return fetch(`${config.baseUrl}/nested-list`).then((jsonData) => {
      const response = normalize({ cities: jsonData }, {
        cities: [schemas.city]
      });

      dispatch({
        type: types.FILL_NESTED_LIST,
        payload: {
          ids: response.result.cities,
          map: response.entities.cities
        }
      });
    });
  };
}

