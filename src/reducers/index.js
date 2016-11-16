import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import ui from './ui';
import companies from './companies';


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  companies,
  ui
});

export default rootReducer;
