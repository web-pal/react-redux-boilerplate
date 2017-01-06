import { createSelector } from 'reselect';

const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);
const getCompaniesIds = state => (state.companiesAllIds);
const getCompaniesMap = state => (state.companiesById);

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getCompanies = createSelector(
  [getCompaniesIds, getCompaniesMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);