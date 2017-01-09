import { createSelector } from 'reselect';

const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);
const getNestedListIds = state => (state.nallIds);
const getNestedListMap = state => (state.nbyId);

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getNestedUsersList = createSelector(
  [getNestedListIds, getNestedListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);
