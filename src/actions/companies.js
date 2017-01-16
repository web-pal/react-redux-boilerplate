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
    fetch(`${config.baseUrl}/companies`).then((jsonData) => {
      const response = normalize(jsonData, [company]);

      dispatch({
        type: types.FILL_EMPLOYEES,
        payload: {
          employeesMap: response.entities.employees,
        }
      });

      dispatch({
        type: types.FILL_COMPANIES,
        payload: {
          companyIds: response.result,
          companyMap: response.entities.companies
        }
      });
    });
  };
}

export function addCompaniesItem(newCompany) {
  return (dispatch, getState) => {
    fetch(
      `${config.baseUrl}/companies`,
      { method: 'POST', body: JSON.stringify(newCompany) }
    ).then((json) => {
      let jsonData = json;
      if (config.fakeFetch) {
        // On real project use data returned from the server
        jsonData = newCompany;
        const lastCompanyId = getState().companies.allIds.last();
        let lastEmployeeId = getState().employees.byId.size;
        jsonData.id = (parseInt(lastCompanyId, 10) + 1).toString();
        jsonData.employees = jsonData.employees.map((emp) => {
          const data = Object.assign({}, emp);
          data.id = (parseInt(lastEmployeeId, 10) + 1).toString();
          lastEmployeeId = (parseInt(lastEmployeeId, 10) + 1);
          return data;
        });
      }

      const employees = normalize({ employees: jsonData.employees }, {
        employees: [employee]
      });

      dispatch({
        type: types.ADD_EMPLOYEES,
        payload: {
          employeesIds: employees.result.employees,
          employeesMap: employees.entities.employees
        }
      });


      const companies = normalize(jsonData, company);

      dispatch({
        type: types.ADD_COMPANIES,
        payload: {
          companyIds: companies.result,
          companyMap: companies.entities.companies
        }
      });
    });
  };
}
