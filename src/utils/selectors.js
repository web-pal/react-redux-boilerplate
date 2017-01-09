import { createSelector } from 'reselect';

const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);

const getCitiesIds = state => (state.citiesIds);
const getCitiesMap = state => (state.citiesById);
const getHabitantsMap = (state, props) => props.item.get('habitants')
  .map(habitant => state.habitantsById.get(habitant));

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getCities = createSelector(
  [getCitiesIds, getCitiesMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getHabitants = createSelector(getHabitantsMap, (hab => hab));
