import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import citiesList from './citiesList';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  citiesList,
});

export default rootReducer;
