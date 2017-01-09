import { normalize, schema } from 'normalizr';

import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';


export const employee = new schema.Entity('employees');
export const company = new schema.Entity('companies', {
  employees: [employee]
});

export function getCompanies() {
  return (dispatch) => {
    return fetch(`${config.baseUrl}/companies`).then((jsonData) => {
      const response = normalize({ companies: jsonData }, {
        companies: [company]
      });

      dispatch({
        type: types.FILL_COMPANIES,
        payload: {
          companyIds: response.result.companies,
          companyMap: response.entities.companies,
          employeesMap: response.entities.employees
        }
      });
    });
  };
}

export function addCompaniesItem() {
  console.log(11);
}