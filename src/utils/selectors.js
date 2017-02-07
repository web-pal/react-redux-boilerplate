import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const getCompaniesIds = state => (state.allIds);
const getCompaniesMap = state => (state.byId);

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
