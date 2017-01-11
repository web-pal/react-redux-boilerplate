import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

export const getListMap = state => (state.list.byId);
export const getCompaniesById = state => (state.companies.companiesById);
export const getEmployeesById = state => (state.employees.employeesById);

export const getListItems = createSelector(
  [getCompaniesById, getEmployeesById],
  (companies, employees) => companies.map(memoize(company => company.set('employees', company.get('employees')
      .map(employee => employees.get(employee)))))
);
