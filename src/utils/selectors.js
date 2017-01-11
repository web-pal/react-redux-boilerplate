import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

// const getListIds = state => (state.allIds);
export const getListMap = state => (state.list.byId);
// const getCompaniesIds = state => (state.companiesAllIds);
export const getCompaniesById = state => (state.companies.companiesById);
// const getEmployeesIds = state => (state.employeesAllIds);
export const getEmployeesById = state => (state.employees.employeesById);

export const getListItems = createSelector(
  [memoize(getCompaniesById), memoize(getEmployeesById)],
    (companies, employees) => companies.map(company => company.set('employees', company.get('employees')
      .map(employee => employees.get(employee))))
);
