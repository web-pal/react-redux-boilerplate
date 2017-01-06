import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import companies from './companies';


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  companies
});

export default rootReducer;
