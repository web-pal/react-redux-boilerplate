import { createSelector } from 'reselect';

const getListIds = state => (state.get('listIds'));
const getListMap = state => (state.get('listMap'));


export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

