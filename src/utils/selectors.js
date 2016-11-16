import { createSelector } from 'reselect';

const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);
const getEmployees = (state, props) => props.item.get('employees').map(emp => state.employees.get(emp));


export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getCompaniesList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())))
);

export const getEmployeesList = createSelector(getEmployees, (emp => emp));
