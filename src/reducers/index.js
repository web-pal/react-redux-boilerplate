import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import companyList from './companyList';
import ui from './ui';


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  companyList,
  ui
});

export default rootReducer;
