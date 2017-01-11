import { createSelector } from 'reselect';

// List
const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

// Cities
const getCitiesIds = state => (state.citiesIds);
const getCitiesMap = state => (state.citiesById);

export const getCities = createSelector(
  [getCitiesIds, getCitiesMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

// Habitants
const getHabitantsIds = state => (state.habitantsIds);
const getHabitantsMap = state => (state.habitantsById);

export const getHabitants = createSelector(
  [getHabitantsIds, getHabitantsMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);
