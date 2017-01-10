import { createSelector } from 'reselect';
import { schema, normalize } from 'normalizr';
import { fromJS } from 'immutable';

// List
const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

const data = [{
  id: '1',
  city: 'Newtown',
  habitants: [{
    id: '2',
    firstName: 'Jack',
    lastName: 'White'
  }, {
    id: '3',
    firstName: 'Mike',
    lastName: 'Carlson'
  }]
}, {
  id: '4',
  city: 'Huston',
  habitants: [{
    id: '5',
    firstName: 'Magnus',
    lastName: 'Hellenborg'
  }, {
    id: '6',
    firstName: 'Daniel',
    lastName: 'Verban'
  }]
}];

const habitant = new schema.Entity('habitants');
const city = new schema.Entity('cities', {
  habitants: [habitant]
});

const normalized = normalize(data, [city]);

const citiesReducer = {
  citiesIds: fromJS(normalized.result),
  citiesById: fromJS(normalized.entities.cities)
};

const habitantsReducer = {
  habitantsIds: fromJS(Object.keys(normalized.entities.habitants)),
  habitantsById: fromJS(normalized.entities.habitants)
};

const getCitiesIds = state => (state.citiesIds);
const getCitiesMap = state => (state.citiesById);

const getHabitantsIds = state => (state.habitantsIds);
const getHabitantsMap = state => (state.habitantsById);

export const getCities = createSelector(
  [getCitiesIds, getCitiesMap],
  (ids, map) => (ids.map(item => map.get(item.toString())))
);

export const getHabitants = createSelector(
  [getHabitantsIds, getHabitantsMap],
  (ids, map) => (ids.map(item => map.get(item.toString())))
);

console.log('Cities: ', getCities(citiesReducer).toJS());
console.log('Habitants: ', getHabitants(habitantsReducer).toJS());

console.log(Object.keys(normalized.entities.habitants));
