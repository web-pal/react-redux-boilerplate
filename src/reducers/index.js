import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import companies from './companies';
import employees from './employees';


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  companies,
  employees
});

export default rootReducer;
