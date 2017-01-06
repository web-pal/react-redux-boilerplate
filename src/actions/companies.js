import { normalize, schema } from 'normalizr';

import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';

export const schemas = {
  companies: new schema.Entity('companies'),
};

export function getCompanies() {
  return (dispatch) => {
    return fetch(`${config.baseUrl}/companies`).then((jsonData) => {
      const response = normalize({ companies: jsonData }, {
        companies: [schemas.companies]
      });

      console.log(response);

      dispatch({
        type: types.FILL_COMPANIES,
        payload: {
          ids: response.result.companies,
          map: response.entities.companies
        }
      });
    });
  };
}

export function addCompaniesItem() {
  console.log(11);
}