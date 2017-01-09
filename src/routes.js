import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Base from './containers/Base/Base';
import Index from './containers/Index/Index';
import List from './containers/List/List';
import Form from './containers/Form/Form';
import NestedList from './containers/NestedList/NestedList';

export const urls = {
  index: '/',
  list: '/list',
  listDeep: '/nested-list',
  form: '/form'
};

export const routes = (
  <Route path={urls.index} component={Base}>
    <IndexRoute component={Index} />
    <Route path={urls.list} component={List} />
    <Route path={urls.form} component={Form} />
    <Route path={urls.listDeep} component={NestedList} />
  </Route>
);
