import { normalize, Schema, arrayOf } from 'normalizr';
import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';

const companies = new Schema('companies');
const employee = new Schema('employee');

companies.define({
  employee: arrayOf(employee)
});

employee.define({
  company: companies
});

export const getCompanyList = () => (dispatch) => {
  dispatch({
    type: types.CHANGE_ENDPOINT_LOADING_STATE,
    meta: { endpoint: 'companyList' },
    payload: true
  });
  return fetch(`${config.baseUrl}/company_list`).then((jsonData) => {
    dispatch({
      type: types.CHANGE_ENDPOINT_LOADING_STATE,
      meta: { endpoint: 'companyList' },
      payload: false
    });

    const response = normalize({ companies: jsonData }, {
      companies: arrayOf(companies),
      employee: arrayOf(employee),
    });

    dispatch({
      type: types.FILL_COMPANY_LIST,
      payload: {
        companyIds: response.result.companies,
        companyMap: response.entities.companies,
        employeeMap: response.entities.employee
      }
    });
  });
};

export const toggleEmployee = id => ({
  type: types.TOGGLE_EMPLOYEE,
  payload: {
    companyId: id
  }
});

const changeEmployeeProcessState = (id, state) => ({
  type: types.CHANGE_EMP_STATE,
  payload: {
    id, state
  }
});

export const removeEmployeeCreator = (id, companyId) => (dispatch) => {
  dispatch(changeEmployeeProcessState(id, ' ...removing'));

  return fetch(
    `${config.baseUrl}/company_list`,
    { method: 'DELETE', body: JSON.stringify({ id }) }
  ).then(() => {
    dispatch(changeEmployeeProcessState(id, ''));
    dispatch({
      type: types.REMOVE_EMPLOYEE,
      payload: {
        employee: id,
        companyId
      }
    });
  });
};
