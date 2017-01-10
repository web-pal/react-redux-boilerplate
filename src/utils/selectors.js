import { createSelector } from 'reselect';
import { schema, normalize } from 'normalizr';
import { Map, List, fromJS } from 'immutable';

// List
const getListIds = state => (state.allIds);
const getListMap = state => (state.byId);

export const getList = createSelector(
  [getListIds, getListMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

// Cities-list
const getCitiesIds = state => (state.citiesIds);
const getCitiesMap = state => (state.citiesById);
const getHabitantsMap = (state, props) => props.item.get('habitants')
  .map(habitant => state.habitantsById.get(habitant));

export const getCities = createSelector(
  [getCitiesIds, getCitiesMap],
  (ids, map) => (ids.map(item => map.get(item.toString())).reverse())
);

export const getHabitants = createSelector(getHabitantsMap, (hab => hab));

const data = [{
  id: '123',
  author: {
    id: '1',
    name: 'Paul'
  },
  title: 'My awesome blog post',
  comments: [
    {
      id: '666',
      commenter: {
        id: '2',
        name: 'Nicole'
      }
    }
  ]
}, {
  id: '1234',
  author: {
    id: '1',
    name: 'Paul'
  },
  title: 'My awesome blog post',
  comments: [
    {
      id: '34',
      commenter: {
        id: '2',
        name: 'Nicole'
      }
    }
  ]
}, {
  id: '4123',
  author: {
    id: '3',
    name: 'Jack'
  },
  title: 'My awesome blog post',
  comments: [
    {
      id: '32',
      commenter: {
        id: '3',
        name: 'Jack'
      }
    }
  ]
}];

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
  commenter: user
});
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});
const articles = [article];

const articleNorm = normalize(data, articles);

console.log('Initial ', data);
console.log('Normalized ', articleNorm);

const immutableArticleNorm = fromJS(articleNorm);
console.log('Immutabled: ', immutableArticleNorm);

console.log('Entities: ', immutableArticleNorm.get('entities'));
console.log('Result: ', immutableArticleNorm.get('result'));

// console.log(getCitiesIds());
