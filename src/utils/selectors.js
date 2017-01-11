import { createSelector } from 'reselect';

const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);
export const getCompaniesById = state => (state.companies.companiesById);
export const getEmployeesById = state => (state.employees.employeesById);
const getCompany = (state) => (state.companies.companiesById.get(state.props.id));

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);


export const getCompanyWithEmployees = createSelector(
  [getCompany, getEmployeesById],
  (company, employees) => company.set('employees', company.get('employees')
      .map(employee => employees.get(employee)))
);
