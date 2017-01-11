import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);
export const getCompaniesById = state => (state.companies.companiesById);
export const getEmployeesById = state => (state.employees.employeesById);

export const getListItems = createSelector(
  [getCompaniesById, getEmployeesById],
  (companies, employees) => companies.map(memoize(company => company.set('employees', company.get('employees')
      .map(employee => employees.get(employee)))))
);

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);
