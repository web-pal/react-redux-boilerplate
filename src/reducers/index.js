import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  routerReducer
} from 'react-router-redux';

import list from './list';
import ui from './ui';


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  list,
  ui
});

export default rootReducer;
