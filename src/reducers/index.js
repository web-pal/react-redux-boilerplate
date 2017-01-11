import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import citiesList from './citiesList';
import habitantsList from './habitantsList';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  citiesList,
  habitantsList
});

export default rootReducer;
