import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import nestedList from './nestedList';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  nestedList
});

export default rootReducer;
