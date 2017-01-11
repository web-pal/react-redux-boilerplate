import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);

const getCompaniesIds = state => (state.allIds);
const getCompaniesMap = state => (state.byId);

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getCompanyEmployees = createSelector(
  state => state.byId,
  map => memoize(
    (memoryKey, ids) => (ids.map(item => map.get(item.toString())).reverse())
  )
);

export const getCompanies = createSelector(
  [getCompaniesIds, getCompaniesMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);
