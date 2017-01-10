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
      const employeesList = [];
      for (let i = 0; i < jsonData.length; i += 1) {
        for (let j = 0; j < jsonData[i].employees.length; j += 1) {
          employeesList.push(jsonData[i].employees[j]);
        }
      }

      const response = normalize({ companies: jsonData, employees: employeesList }, {
        companies: [company],
        employees: [employee]
      });

      dispatch({
        type: types.FILL_COMPANIES,
        payload: {
          companyIds: response.result.companies,
          companyMap: response.entities.companies,
          employeesIds: response.result.employees,
          employeesMap: response.entities.employees,
        }
      });
    });
  };
}

// fetch(`${config.baseUrl}/companies`).then((jsonData) => {
//   const response = normalize({ companies: jsonData }, {
//     companies: [company]
//   });

//   dispatch({
//     type: types.FILL_COMPANIES,
//     payload: {
//       companyIds: response.result.companies,
//       companyMap: response.entities.companies,
//       employeesMap: response.entities.employees
//     }
//   });
// });

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
        const lastCompanyId = getState().companies.companiesAllIds.last();
        let lastEmployeeId = getState().employees.employeesAllIds.last();
        jsonData.id = (parseInt(lastCompanyId, 10) + 1).toString();
        jsonData.employees = jsonData.employees.map((emp) => {
          const data = Object.assign({}, emp);
          data.id = (parseInt(lastEmployeeId, 10) + 1).toString();
          lastEmployeeId = (parseInt(lastEmployeeId, 10) + 1);
          return data;
        });
      }

      dispatch({
        type: types.ADD_COMPANIES,
        payload: jsonData
      });

      const employees = normalize({ employees: jsonData.employees }, {
        employees: [employee],
      });

      dispatch({
        type: types.ADD_EMPLOYEES,
        payload: {
          employeesIds: employees.result.employees,
          employeesMap: employees.entities.employees
        }
      });
    });
  };
}
