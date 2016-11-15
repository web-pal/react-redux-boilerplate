import { createSelector } from 'reselect';

const getListIds = state => state.allIds;
const getListMap = state => state.byId;
const getEmployee = (state, props) => props.item.get('employee').map(emp => (state.employee.get(emp) ? state.employee.get(emp) : '')).filter(emp => emp !== '');

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getCompaniesList = createSelector(
  [getListIds, getListMap],
  (ids, companies) => (ids.map(item => companies.get(item)))
);

export const getEmployeeList = () => createSelector(getEmployee, (emp => emp));
